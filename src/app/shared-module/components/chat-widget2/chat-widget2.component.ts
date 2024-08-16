import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BotMonitoringService } from 'src/app/main/main/ai-bot/bot-monitoring.service';
import { ChatVisibilityService } from 'src/app/services/chat-visibility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-widget2',
  templateUrl: './chat-widget2.component.html',
  styleUrls: ['./chat-widget2.component.scss']
})
export class ChatWidget2Component implements OnInit {
  @ViewChild('chatBody') private chatBody?: ElementRef;
  @Input() hasParent: boolean = false;
  messages: any[] = [];
  chatMessages: any[] = [];
  lastServiceErrorTime: number = 0;
  typing = false;
  currentTimestamp: Date = new Date();
  isOpen = false;
  session_id = "";
  chatForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required])
  })
  workspace_id = environment.workspace_id;
  bot_id = environment.bot_id;
  interval: any;
  apiGaveResponse: any = false;
  tempCount: any = 0;
  buttonAlreadyClicked: any = false;
  conversation_end: any = 0;
  credentials = {
    fullName: '',
    email: ''
  };
  isCredentialsEntered = 0;
  isFirstMessage = 0;
  NameValidationError: any;
  EmailValidationError: any;
  registerForm!: FormGroup;
  currentUserName: any;
  constructor(private fb: FormBuilder, private chatVisibilityService: ChatVisibilityService, private _spinner: NgxSpinnerService, private _botService: BotMonitoringService, private _toastS: ToastrService, private cdr: ChangeDetectorRef, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, this.fullNameValidator()]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.session_id = this.generateRandomString(6);
  }
  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  scrollToBottom(): void {
    try {
      if (this.chatBody) {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }
  openChat() {
    this.isOpen = true;
  }
  closeChat() {
    this.isOpen = false;
    //this.messages = [];
  }
  get cf() {
    return this.chatForm.controls
  }
  submitMessage(msg: any) {
    // this.apiGaveResponse = false
    const mesage = msg;
    const message = this.chatForm.value['message'];

    if (!message.trim()) {
      const now = Date.now();
      if (now - this.lastServiceErrorTime > 3000) {
        this._toastS.error('Message is Required', '', {
          timeOut: 3000,
        });
        this.lastServiceErrorTime = now;
      }
    }
    else {
      if (!this.session_id) {
        this.session_id = this.generateRandomString(6);
        this.sendMessage(mesage);
      } else {
        this.sendMessage(mesage);
      }
    }

  }



  sendMessage(mesage: any) {
    const body = {
      "text": mesage != '' ? mesage : this.chatForm.value['message'],
      "session_id": this.session_id,
      "workspace_id": this.workspace_id,
      "bot_id": this.bot_id,
      // "token":"7dIxWgeDrvMY3cFAS3UsZuZCoZWto4lzcurzJn0QL7Myw7KHe7LdWlOnEtAeSoe1"
      "token": localStorage.getItem("token")
    };
    this.tempCount++;
    this.chatMessages.push({
      text: this.chatForm.value['message'],
      slug: this.session_id,
      type: 'human',
      timestamp: new Date()
    });
    // this.messages.push({
    //   message: this.chatForm.value['message'],
    //   slug: this.session_id,
    //   type: 'user',
    //   timestamp: new Date()
    // });

    this.chatForm.reset({ message: '' });
    this.typing = true;
    this.currentTimestamp = new Date();

    this._botService.ChatBotWdidget(body).subscribe(
      (res: any) => {
        if(mesage == '/bye'){
          const clickedItem = {
            active:false,
            session_id: this.session_id
          }
          const refreshIndex = this.chatVisibilityService.refreshHistoryArray.findIndex(session_id => session_id == this.session_id);
          this.session_id = ""
          this.chatMessages=[];
          this.typing = false;
          this.isCredentialsEntered = 0;
          this.registerForm.reset();
          this.currentUserName = '';
          clearInterval(this.interval);
          debugger
          if(refreshIndex!=-1){
          this.chatVisibilityService.refreshHistoryArray.splice(refreshIndex, 1);
          this.chatVisibilityService.notifyNewChatIdHistory(clickedItem);
          }
        }
        else if(mesage == '/transfer'){
          debugger
          this.buttonAlreadyClicked = true;
          const clickedItem = {
            active:false,
            session_id: this.session_id
          }
          const refreshIndex = this.chatVisibilityService.refreshHistoryArray.findIndex(session_id => session_id == this.session_id);
          if(refreshIndex!=-1){
          this.chatVisibilityService.refreshHistoryArray.splice(refreshIndex, 1);
          this.chatVisibilityService.notifyNewChatIdHistory(clickedItem);
          }
          this.interval = setInterval(() => {
            this.refreshHistory();
          }, 5000)
          this.refreshHistory()
        }
        else{
          this.interval = setInterval(() => {
            this.refreshHistory();
          }, 5000)
          this.refreshHistory()
        }
       
        // this.messages.push({
        //   message: res.detail,
        //   type: 'bot',
        //   timestamp: new Date()
        // });
      },
      (error: any) => {
        const now = Date.now();
        this.typing = false;
        // this.messages.splice(this.messages.length - 1,1)
        if (now - this.lastServiceErrorTime > 3000) {
          this._toastS.error('Service Unavailable', 'Failed!', {
            timeOut: 3000,
          });
          this.lastServiceErrorTime = now;
        }
      }
    );
  }

  getCurrentTime(): string {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;

    return `${hours}:${minutesStr} ${ampm}`;
  }

  refreshHistory() {
    const formData = { bot_id: this.bot_id, workspace_id: this.workspace_id, session_id: this.session_id }
    this._botService.ChatHistory(formData).subscribe((res: any) => {
      if (this.tempCount > 0) {
        this.tempCount--;
        this.chatMessages.splice(this.chatMessages.length - 1, 1)
      }
      // this.apiGaveResponse = true;
      if (res.detail.length > 0) {
        // res.detail['session_id'] = this.session_id;
        // res.detail['last_message'] = this.chat.last_message;
        res.detail.map((item: any) => {
          item.timestamp = this.formatDate(item.timestamp);
        })
        this.typing = false;
        this.chatMessages = res.detail;
        this.conversation_end = res.conversation_end;
        //this.chats.push(res[0].history);
      } else {
        this._spinner.hide('chat-history')
        alert("History not found");
      }
    }, (error) => {
      console.error(error);
    });
  }

  formatDate(inputDate: string): any {
    const [day, month, year, hours, minutes, seconds] = inputDate.split(/[/ :]/);
    const parsedDate = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
    return this.datePipe.transform(parsedDate, 'h:mm a');
  }
  submitCredentials() {
    if (this.registerForm.valid) {
      const data = {
        email: this.registerForm.value.email,
        username: this.registerForm.value.fullName,
        token: localStorage.getItem('token')
      }
      this._botService.ProfileCreate(data).subscribe((res:any)=>{
        this.isCredentialsEntered = 1;
        this.currentUserName = this.registerForm.value.fullName;
        // this.registerForm.reset;
        console.log("response", res)
        this.session_id = res.detail;
        console.log("session id: ", res.detail);
      },
      error=>{
        this.isCredentialsEntered = 0;
        this._toastS.error(error.error);
      }
    )
      // Handle the form submission
    } else {
      this.isCredentialsEntered = 0;
      // Trigger validation messages
      this.registerForm.markAllAsTouched();
    }
  }
  
  fullNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
      const valid = fullNameRegex.test(control.value);
      return valid ? null : { fullNameInvalid: true };
    };
  }
  
  ngOnDestroy() {
    clearInterval(this.interval);
  }
}



