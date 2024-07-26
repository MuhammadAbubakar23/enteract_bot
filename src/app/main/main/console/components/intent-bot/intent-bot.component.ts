import { Component } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-intent-bot',
  templateUrl: './intent-bot.component.html',
  styleUrls: ['./intent-bot.component.scss']
})
export class IntentBotComponent {
  constructor(private _hS: HeaderService, private sidenavService: SidenavService) {
    _hS.updateHeaderData({
      title: 'Intent Bot',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class:"fa-light fa-calendar"
    })
  }
}
