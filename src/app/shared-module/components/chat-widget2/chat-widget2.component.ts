import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BotMonitoringService } from 'src/app/main/main/ai-bot/bot-monitoring.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-widget2',
  templateUrl: './chat-widget2.component.html',
  styleUrls: ['./chat-widget2.component.scss']
})
export class ChatWidget2Component implements OnInit {
  @ViewChild('chatBody') private chatBody?: ElementRef;
  @Input() hasParent: boolean=false;
  messages: any[] = [];
  typing = false;
  currentTimestamp: Date = new Date();
  isOpen = false;
  session_id = "";
  chatForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required])
  })
  workspace_id = environment.workspace_id;
  bot_id = environment.bot_id;
  constructor(private _botService: BotMonitoringService) { }

  ngOnInit(): void {
    this.session_id = this.generateRandomString(6);
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

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
  submitMessage() {
    if (!this.session_id) {
      this._botService.chatInit().subscribe(
        (res: any) => {
          this.session_id = res.session_id;
          this.sendMessage();
        },
        (error: any) => {
          alert('Service unavailable');
        }
      );
    } else {
      this.sendMessage();
    }
  }

  sendMessage() {
    const body = {
      "text": this.chatForm.value['message'],
      "session_id": this.session_id,
      "workspace_id":this.workspace_id,
      "bot_id":this.bot_id,
    };

    this.messages.push({
      message: this.chatForm.value['message'],
      slug: this.session_id,
      type: 'user',
      timestamp: new Date()
    });

    this.chatForm.reset({ message: '' });
    this.typing = true;
    this.currentTimestamp = new Date();

    this._botService.ChatBotWdidget(body).subscribe(
      (res: any) => {
        this.typing = false;
        this.messages.push({
          message: res.detail,
          type: 'bot',
          timestamp: new Date()
        });
      },
      (error: any) => {
        alert('Service unavailable');
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



