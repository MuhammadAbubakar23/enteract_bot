import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChatHistoryVisibilityServiceService } from 'src/app/services/chat-history-visibility-service.service';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';

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

  constructor(private chatVisibilityService: ChatHistoryVisibilityServiceService, private _spinner:NgxSpinnerService) { }
  ngOnInit(): void {

    console.log("this.chat", this.chat)
  }
  removeScreen() {

    let newChat =
      { "slug": this.chat[0].slug }
    this.chatVisibilityService.notifyNewChatIdHistory(newChat);
    const index = this.chatVisibilityService.refreshHistoryArray.indexOf(this.chat[0].slug);
    if (index !== -1) {
      this.chatVisibilityService.refreshHistoryArray.splice(index, 1);
}

  }
  toggleMinimized(): void {
    this.isMinimized = !this.isMinimized;
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

