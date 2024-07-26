import { Component } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-event-logs',
  templateUrl: './event-logs.component.html',
  styleUrls: ['./event-logs.component.scss']
})
export class EventLogsComponent {
  constructor(private _hS: HeaderService, private sidenavService: SidenavService) {
    _hS.updateHeaderData({
      title: 'Event Logs',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class:"fa-light fa-calendar"
    })
  }
}
