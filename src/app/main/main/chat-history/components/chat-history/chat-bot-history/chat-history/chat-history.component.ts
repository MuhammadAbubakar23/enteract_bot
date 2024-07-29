import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BotMonitoringService } from 'src/app/main/main/ai-bot/bot-monitoring.service';
import { ChatHistoryVisibilityServiceService } from 'src/app/services/chat-history-visibility-service.service';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModuleModule],
})
export class ChatHistoryComponent implements OnInit {

  @Input() chat: any = { history: [], tags: [] };
  isMinimized: boolean = true;
  isRemoved: boolean = false;
  @Output() minimizeToggle: EventEmitter<void> = new EventEmitter<void>();
  interval: any;
  bot_id= environment.bot_id;
  workspace_id= environment.workspace_id;

  constructor(private chatVisibilityService: ChatHistoryVisibilityServiceService, private _botS: BotMonitoringService,private _spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.refreshHistory();
    }, 5000)
    console.log("this.chat", this.chat)
  }
  removeScreen() {
    debugger
    let newChat =
      { "session_id": this.chat.session_id }
    this.chatVisibilityService.notifyNewChatIdHistory(newChat);
    const index = this.chatVisibilityService.refreshHistoryArray.indexOf(this.chat.session_id);
    if (index !== -1) {
      this.chatVisibilityService.refreshHistoryArray.splice(index, 0);
}

  }
  toggleMinimized(): void {
    this.isMinimized = !this.isMinimized;
  }
  refreshHistory() {
    const formData = {bot_id:this.bot_id,workspace_id:this.workspace_id,session_id:this.chat.session_id}
    this._botS.ChatHistory(formData).subscribe((res: any) => {
      if (res.detail.length > 0) {
        res.detail['session_id'] = this.chat.session_id;
        res.detail['last_message'] = this.chat.last_message;
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

  ngOnDestroy(){
    clearInterval(this.interval);
  }
  // refreshHistory() {
  //   debugger
  //   this._botS.ChatHistory({ 'slug': this.chat[0].slug }).subscribe((res: any) => {
  //     if (res[0].history.length > 0) {
  //       res[0].history[0]['slug'] = this.chat[0].slug;
  //       res[0].history[0]['name'] = this.chat[0].name;
  //       this.chat = res[0].history;
  //       //this.chats.push(res[0].history);
  //     } else {
  //       this._spinner.hide('chat-history')
  //       alert("History not found");
  //     }
  //   }, (error) => {
  //     console.error(error);
  //   });
  // }
}

