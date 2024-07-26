import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    MainRoutingModule
  ]
})
export class MainModule { }
