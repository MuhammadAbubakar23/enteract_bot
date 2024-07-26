import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanInteractionsRoutingModule } from './human-interactions-routing.module';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { ChatBotHistoryComponent } from './components/chat-history/chat-bot-history/chat-bot-history.component';


@NgModule({
  declarations: [
    ChatHistoryComponent
  ],
  imports: [
    CommonModule,
    HumanInteractionsRoutingModule,
    ChatBotHistoryComponent
  ]
})
export class HumanInteractionsModule { }
