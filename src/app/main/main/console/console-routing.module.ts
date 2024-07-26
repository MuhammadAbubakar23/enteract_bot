import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventLogsComponent } from './components/event-logs/event-logs.component';
import { ConnectChannelsComponent } from './components/connect-channels/connect-channels.component';
import { KnowledgeBaseComponent } from './components/knowledge-base/knowledge-base.component';
import { TagsComponent } from './components/tags/tags.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RulesComponent } from './components/rules/rules.component';
import { ConversationalBotComponent } from './components/conversational-bot/conversational-bot.component';
import { IntentBotComponent } from './components/intent-bot/intent-bot.component';
import { MenuBotComponent } from './components/menu-bot/menu-bot.component';
import { TemplatesComponent } from './components/templates/templates.component';

const routes: Routes = [
  { path: '', redirectTo: 'event-logs', pathMatch: 'full' },
  {path:'bot-management',redirectTo:'conversational-bot'},
  { path: 'event-logs', component: EventLogsComponent },
  { path: 'intent-bot', component: IntentBotComponent },
  { path: 'bot-management/menu-bot', component: MenuBotComponent},
  { path: 'bot-management/conversational-bot', component: ConversationalBotComponent },
  { path: 'bot-management/configurations', component: ConfigurationsComponent},
  { path: 'bot-management/templates', component: TemplatesComponent},
 
  { path: 'rules-bot', component: RulesComponent },
  { path: 'connect-channels', component: ConnectChannelsComponent},
  { path: 'settings', component: SettingsComponent },
 
  { path: 'user-management', component: UserManagementComponent },
  { path: 'tags', component: TagsComponent},
  { path: 'knowledge-base', component: KnowledgeBaseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
