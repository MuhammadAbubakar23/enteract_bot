import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'ai-bot',
        loadChildren: () => import('./ai-bot/ai-bot.module').then(m => m.AiBotModule)
      },
      {
        path: 'analytics',
        loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule),
      },
      {
        path: 'chat-history',
        loadChildren: () => import('./chat-history/chat-history.module').then(m => m.ChatHistoryModule),
      },
      {
        path: 'human-interactions',
        loadChildren: () => import('./human-interactions/human-interactions.module').then(m => m.HumanInteractionsModule),
      },
      {
        path: 'console',
        loadChildren: () => import('./console/console.module').then(m => m.ConsoleModule),
      }
      // Uncomment or remove the comment to enable this route if needed
      // { path: 'console', loadChildren: () => import('./console/console.module').then(m => m.ConsoleModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
