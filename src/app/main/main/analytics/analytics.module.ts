import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AiBotAnalyticsComponent } from './components/ai-bot-analytics/ai-bot-analytics.component';
import { ConversationAnalyticsComponent } from './components/conversation-analytics/conversation-analytics.component';
import { BotKpiComponent } from './components/bot-kpi/bot-kpi.component';
import { SentimentsAndTagsComponent } from './components/sentiments-and-tags/sentiments-and-tags.component';
import { TokensComponent } from './components/tokens/tokens.component';
import { ThousandSuffPipe } from './Pipe/thousand-suff.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AiBotAnalyticsComponent,
    ConversationAnalyticsComponent,
    BotKpiComponent,
    SentimentsAndTagsComponent,
    TokensComponent,
    ThousandSuffPipe
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    NgxSpinnerModule
  ]
})
export class AnalyticsModule { }
