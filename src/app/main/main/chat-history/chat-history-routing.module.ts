import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
const routes: Routes = [
  { path: '', redirectTo: 'conversations', pathMatch: 'full' },
  { path: 'conversations', component: ChatHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatHistoryRoutingModule { }
