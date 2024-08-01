import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConsoleRoutingModule } from './console-routing.module';
import { EventLogsComponent } from './components/event-logs/event-logs.component';
import { IntentBotComponent } from './components/intent-bot/intent-bot.component';
import { ConversationalBotComponent } from './components/conversational-bot/conversational-bot.component';
import { RulesComponent } from './components/rules/rules.component';
import { ConnectChannelsComponent } from './components/connect-channels/connect-channels.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { TagsComponent } from './components/tags/tags.component';
import { KnowledgeBaseComponent } from './components/knowledge-base/knowledge-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuBotComponent } from './components/menu-bot/menu-bot.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { ToastrModule } from 'ngx-toastr';
import { CreateUserComponent } from './components/user-management/create-user/create-user.component';
import { ConversationalBotConfigurationComponent } from './components/conversational-bot/conversational-bot-configuration/conversational-bot-configuration.component';
import { ConversationalBotUploadFilesComponent } from './components/conversational-bot/conversational-bot-upload-files/conversational-bot-upload-files.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    EventLogsComponent,
    IntentBotComponent,
    ConversationalBotComponent,
    RulesComponent,
    ConnectChannelsComponent,
    SettingsComponent,
    ConfigurationsComponent,
    UserManagementComponent,
    TagsComponent,
    KnowledgeBaseComponent,
    MenuBotComponent,
    TemplatesComponent,
    CreateUserComponent,
    ConversationalBotConfigurationComponent,
    ConversationalBotUploadFilesComponent
    ],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ]
})
export class ConsoleModule { }
