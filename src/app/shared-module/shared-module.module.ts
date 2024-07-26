import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleRoutingModule } from './shared-module-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ChatWidget2Component } from './components/chat-widget2/chat-widget2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    ChatWidget2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModuleRoutingModule
  ],
  exports: [
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    ChatWidget2Component
    ]
})
export class SharedModuleModule { }
