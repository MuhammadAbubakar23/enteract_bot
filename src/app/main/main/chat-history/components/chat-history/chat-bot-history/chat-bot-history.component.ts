import { Component, OnInit } from '@angular/core';

import { debounceTime, exhaustMap } from 'rxjs/operators';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { ChatHistoryVisibilityServiceService } from 'src/app/services/chat-history-visibility-service.service';
// import { BotMonitoringService } from '../../../bot-monitoring.service';
import { BotMonitoringService } from 'src/app/main/main/ai-bot/bot-monitoring.service';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-chat-bott-history',
  templateUrl: './chat-bot-history.component.html',
  styleUrls: ['./chat-bot-history.component.scss'],
  standalone: true,
  imports: [CommonModule, ChatHistoryComponent, SharedModuleModule, NgxSpinnerModule]
})
export class ChatBotHistoryComponent implements OnInit {
  chats: any[] = [];
  currentActiveChats: any[] = [];
  hasParent: boolean = true;
  private newChatIdHistorySubscription: Subscription | undefined;

  constructor(
    private _chatVisibilityS: ChatHistoryVisibilityServiceService,
    private _botS: BotMonitoringService,
    private _spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.newChatIdHistorySubscription = this._chatVisibilityS.newChatIdHistory$
      .pipe(
        debounceTime(100),
        exhaustMap((newChat: any) => {
          if (newChat) {
            const chatIndex = this.chats.findIndex(chat => chat[0].slug === newChat.slug);
            if (chatIndex !== -1) {
              this.chats.splice(chatIndex, 1);
              this._chatVisibilityS.notifythirdActiveHistory({ active: false, slug: newChat.slug });
              return [];
            } else {
              return this.getChatDetails(newChat);
            }
          }
          return [];
        })
      )
      .subscribe();
  }

  getChatDetails(activeChat: any) {
    const data = { active: activeChat.active, slug: activeChat.slug, name: activeChat.name, res: activeChat.historyApiresponse };
    if (this.chats.length > 2) {
      this._chatVisibilityS.notifythirdActiveHistory({ active: false, slug: activeChat.slug });
      alert('The maximum number of visible screens is limited to three.');
      return [];
    }
    return this.getHistoryDetailss(data);
  }

  getHistoryDetailss(data: any) {
    if (data.res[0].history.length > 0) {
          this._chatVisibilityS.notifythirdActiveHistory({ active: true, slug: data.slug });
          data.res[0].history[0]['slug'] = data.slug;
          data.res[0].history[0]['name'] = data.name;
          this.chats.push(data.res[0].history);
          this._chatVisibilityS.refreshMethod(data.res[0].history[0].slug);
        } 
      else {
              alert("History not found");
      }
    return data.res
  }
  // getHistoryDetails(data: any) {
  //   debugger
  //   this._spinner.show('chat-history');
  //   return this._botS.ChatHistory({ 'slug': data.slug }).pipe(
  //     exhaustMap((res: any) => {
  //       this._spinner.hide('chat-history');
  //       if (res[0].history.length > 0) {
  //         this._chatVisibilityS.notifythirdActiveHistory({ active: true, slug: data.slug });
  //         res[0].history[0]['slug'] = data.slug;
  //         res[0].history[0]['name'] = data.name;
  //         this.chats.push(res[0].history);
  //         this._chatVisibilityS.refreshMethod(res[0].history[0].slug);
  //       } else {
  //         alert("History not found");
  //       }
  //       return [];
  //     })
  //   );
  // }
  onMinimizeToggle(minimizeItem: any) {
    console.log("minimize toggle", minimizeItem, this.chats);
  }
  ngOnDestroy() {
    this._chatVisibilityS.notifyNewChatIdHistory(null);
    if (this.newChatIdHistorySubscription) {
      this.newChatIdHistorySubscription.unsubscribe();
    }
  }
}
