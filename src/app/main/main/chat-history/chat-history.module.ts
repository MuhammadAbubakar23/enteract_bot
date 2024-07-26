import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHistoryRoutingModule } from './chat-history-routing.module';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { ChatBotHistoryComponent } from './components/chat-history/chat-bot-history/chat-bot-history.component';

@NgModule({
  declarations: [ChatHistoryComponent],
  imports: [
    CommonModule,
    ChatHistoryRoutingModule,
    ChatBotHistoryComponent
  ]
})
export class ChatHistoryModule { }
