import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpandedConsoleComponent } from './sidenav-expanded/expanded-console/expanded-console.component';
import { ExpandedAnalyticsComponent } from './sidenav-expanded/expanded-analytics/expanded-analytics.component';
import { ExpandedBotConversationComponent } from './sidenav-expanded/expanded-bot-conversation/expanded-bot-conversation.component';
import { ExpandedChatHistoryComponent } from './sidenav-expanded/expanded-chat-history/expanded-chat-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InitialLettersPipe } from './services/pipes/initial-letters.pipe';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpandedHumanInteractionsComponent } from './sidenav-expanded/expanded-human-interactions/expanded-human-interactions.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    ExpandedConsoleComponent,
    ExpandedAnalyticsComponent,
    ExpandedBotConversationComponent,
    ExpandedChatHistoryComponent,
    InitialLettersPipe,
    ExpandedHumanInteractionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),

  ],
  providers: [

  //   // {
  //   //   provide:HTTP_INTERCEPTORS,
  //   //   useClass:TokenInterceptorService,
  //   //   multi:true
  //   // },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
