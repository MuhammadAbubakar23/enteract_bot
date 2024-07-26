import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotMonitoringComponent } from './components/bot-monitoring/bot-monitoring.component';
import { AiBotRoutingModule } from './ai-bot-routing.module';
import { ChatBotHistoryComponent } from './components/bot-monitoring/chat-bot-history/chat-bot-history.component';


@NgModule({
  declarations: [
    BotMonitoringComponent
  ],
  imports: [
    CommonModule,
    AiBotRoutingModule,
    ChatBotHistoryComponent,
]
})
export class AiBotModule { }
