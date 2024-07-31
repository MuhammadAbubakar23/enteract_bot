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
import { CreateUserComponent } from './components/user-management/create-user/create-user.component';
import { ConversationalBotConfigurationComponent } from './components/conversational-bot/conversational-bot-configuration/conversational-bot-configuration.component';
import { ConversationalBotUploadFilesComponent } from './components/conversational-bot/conversational-bot-upload-files/conversational-bot-upload-files.component';

const routes: Routes = [
  { path: '', redirectTo: 'bot-management/conversational-bot', pathMatch: 'full' },
  {path:'bot-management',redirectTo:'conversational-bot'},
  { path: 'event-logs', component: EventLogsComponent },
  { path: 'intent-bot', component: IntentBotComponent },
  { path: 'bot-management/menu-bot', component: MenuBotComponent},
  { path: 'bot-management/conversational-bot', component: ConversationalBotComponent },
  { path: 'bot-management/conversational-bot/configuration', component: ConversationalBotConfigurationComponent },
  { path: 'bot-management/conversational-bot/upload', component: ConversationalBotUploadFilesComponent },
  { path: 'bot-management/configurations', component: ConfigurationsComponent},
  { path: 'bot-management/templates', component: TemplatesComponent},
 
  { path: 'rules-bot', component: RulesComponent },
  { path: 'connect-channels', component: ConnectChannelsComponent},
  { path: 'settings', component: SettingsComponent },
 
  { path: 'users', component: UserManagementComponent },
  {
    path: 'users/create',component: CreateUserComponent },
  {
    path: 'users/create/:id',component: CreateUserComponent },
  { path: 'tags', component: TagsComponent},
  { path: 'knowledge-base', component: KnowledgeBaseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
