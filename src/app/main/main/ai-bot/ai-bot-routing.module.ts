import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotMonitoringComponent } from './components/bot-monitoring/bot-monitoring.component';


const routes: Routes = [
  { path: '', redirectTo: 'bot-interaction', pathMatch: 'full' },
  { path: 'bot-interaction', component: BotMonitoringComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AiBotRoutingModule { }
