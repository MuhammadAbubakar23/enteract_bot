import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiBotAnalyticsComponent } from './components/ai-bot-analytics/ai-bot-analytics.component';
import { ConversationAnalyticsComponent } from './components/conversation-analytics/conversation-analytics.component';
import { BotKpiComponent } from './components/bot-kpi/bot-kpi.component';
import { SentimentsAndTagsComponent } from './components/sentiments-and-tags/sentiments-and-tags.component';
import { TokensComponent } from './components/tokens/tokens.component';
import { AiDashboardComponent } from './components/ai-dashboard/ai-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'bot-analytics', pathMatch: 'full' },
  { path: 'bot-analytics', component: AiBotAnalyticsComponent },
  { path: 'conversation', component: ConversationAnalyticsComponent },
  { path: 'bot-kpis', component: BotKpiComponent },
  { path: 'sentiments', component: SentimentsAndTagsComponent },
  { path: 'tokens', component: TokensComponent },
  { path: 'ai-dashboard', component: AiDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
