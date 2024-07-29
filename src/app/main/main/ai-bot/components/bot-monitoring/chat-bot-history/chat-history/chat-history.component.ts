import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChatVisibilityService } from 'src/app/services/chat-visibility.service';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { BotMonitoringService } from '../../../../bot-monitoring.service';
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

  constructor(private chatVisibilityService: ChatVisibilityService, private _botS: BotMonitoringService,private _spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.refreshHistory();
    }, 5000)
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
}

