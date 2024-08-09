import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BotMonitoringService } from 'src/app/main/main/ai-bot/bot-monitoring.service';
import { ChatHistoryService } from 'src/app/main/main/chat-history/chat-history.service';
import { UsersService } from 'src/app/main/main/console/components/user-management/users.service';
import { ChatVisibiltyHumanInteractionService } from 'src/app/services/chat-visibilty-human-interaction.service';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { exhaustMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModuleModule, FormsModule, ReactiveFormsModule],
  providers: [DatePipe]
})
export class ChatHistoryComponent implements OnInit {

  @Input() chat: any = { history: [], tags: [] };
  isMinimized: boolean = true;
  isRemoved: boolean = false;
  @Output() minimizeToggle: EventEmitter<void> = new EventEmitter<void>();
  interval: any;
  bot_id = environment.bot_id;
  username:any = localStorage.getItem("username");
  workspace_id = environment.workspace_id;
  chatForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required])
  })
  lastServiceErrorTime: number = 0;
  // session_id = "";
  messages: any[] = [];
  typing = false;
  currentTimestamp: Date = new Date();
  tempCount: any;
  constructor(private chatVisibilityService: ChatVisibiltyHumanInteractionService, private _botS: BotMonitoringService, private _spinner: NgxSpinnerService,
    private datePipe: DatePipe, private _toastS: ToastrService, private _botService: BotMonitoringService, private uservc: UsersService) { }
  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.refreshHistory();
    }, 5000)
    this.chat.map((item: any) => {
      item.timestamp = this.formatDate(item.timestamp);
    })
    console.log("this.chat", this.chat)
  }
  removeScreen() {
    let newChat =
      { "session_id": this.chat.session_id }
    this.chatVisibilityService.notifyNewChatIdHistory(newChat);
    const index = this.chatVisibilityService.refreshHistoryArray.indexOf(this.chat.session_id);
    if (index !== -1) {
      this.chatVisibilityService.refreshHistoryArray.splice(index, 0);
    }
  }
  killChat(kill:any){
    const confirmation = confirm('Are you sure you want to end this conversation?');
    if (confirmation) {
      this.submitMessage(kill);
      this.removeScreen();
    }
    else{
      this.chatForm.reset({ message: '' });
    }
  }
  toggleMinimized(): void {
    this.isMinimized = !this.isMinimized;
  }
  refreshHistory() {
    const formData = { bot_id: this.bot_id, workspace_id: this.workspace_id, session_id: this.chat.session_id }
    this._botS.ChatHistory(formData).subscribe((res: any) => {
      if (this.tempCount > 0) {
        this.tempCount--;
        this.chat.splice(this.chat.length - 1, 1)
      }
      if (res.detail.length > 0) {
        res.detail['session_id'] = this.chat.session_id;
        res.detail['last_message'] = this.chat.last_message;
        res.detail.map((item: any) => {
          item.timestamp = this.formatDate(item.timestamp);
        })
        this.chat = res.detail;
        //this.chats.push(res[0].history);
      } else {
        this._spinner.hide('chat-history')
        alert("History not found");
      }
    }, (error) => {
      console.error(error);
    });
  }

  formatDate(inputDate: any): any {
    const [day, month, year, hours, minutes, seconds] = inputDate.split(/[/ :]/);
    const parsedDate = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
    return this.datePipe.transform(parsedDate, 'h:mm a');
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }


  // getUserById(id: any): void {
  //   // Ensure there's a valid ID before making a request
  //   if (id != null) {
  //     // this.spinnerService.show();
  
  //     of(id)
  //       .pipe(
  //         exhaustMap((id) => this.uservc.GetUsersById(id)), // Ensure only one request is made at a time
  //         tap(
  //           (res: any) => {
  //             this.username = res.firstName + ' ' + res.lastName;
  //             const agentData = { agent_id: id, agent_name: this.username };
  //             localStorage.setItem('agentData', JSON.stringify(agentData));
  
  //             // response.roleId = this.mapRoleNamesToIds(response.roleId);
  //             // this.setform(response);
  
  //             // this.spinnerService.hide();
  //           },
  //           (error: any) => {
  //             // this.spinnerService.hide();
  //             console.error(error);
  //           }
  //         )
  //       )
  //       .subscribe();
  //   }
  // }

  get cf() {
    return this.chatForm.controls
  }
  submitMessage(msg: any) {
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
      if (!this.chat.session_id) {
        this._botService.chatInit().subscribe(
          (res: any) => {
            this.chat.session_id = res.session_id;
            this.sendMessage(mesage);
          },
          (error: any) => {
            const now = Date.now();
            if (now - this.lastServiceErrorTime > 3000) {
              this._toastS.error('Service Unavailable', 'Failed!', {
                timeOut: 3000,
              });
              this.lastServiceErrorTime = now;
            }
          }
        );
      } else {
        this.sendMessage(mesage);
      }
    }

  }



  sendMessage(mesage: any) {
    const body = {
      "text": mesage != '' ? mesage : this.chatForm.value['message'],
      "session_id": this.chat.session_id,
      "workspace_id": this.workspace_id,
      "bot_id": this.bot_id,
      // "token": "7dIxWgeDrvMY3cFAS3UsZuZCoZWto4lzcurzJn0QL7Myw7KHe7LdWlOnEtAeSoe1"
      "token":"aBeTgzi8YWT80GGApYGVenqbqRlhoTvSka63OSWQPKYGGSX1LS7X2tJHIplzZv4w",
      "agent_name":localStorage.getItem("username")
    };
    var date = this.getCurrentTime();

    this.tempCount++;
    this.chat.push({
      text: this.chatForm.value['message'],
      timestamp: date,
      type: 'human-agent',
      agent_name:localStorage.getItem("username")
    })
    // this.messages.push({
    //   message: this.chatForm.value['message'],
    //   slug: this.chat.session_id,
    //   type: 'human_agent',
    //   timestamp: new Date()
    // });

    this.chatForm.reset({ message: '' });
    this.typing = true;
    // this.currentTimestamp = new Date();

    this._botService.ChatHumanWdidget(body).subscribe(
      (res: any) => {
        this.typing = false;
        // this.messages.push({
        //   message: res.detail,
        //   type: 'user',
        //   timestamp: new Date()
        // });
      },
      (error: any) => {
        const now = Date.now();
        this.typing = false;
        this.messages.splice(this.messages.length - 1, 1)
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

    return `${hours}:${minutesStr}:${secondsStr} ${ampm}`;
  }
}

