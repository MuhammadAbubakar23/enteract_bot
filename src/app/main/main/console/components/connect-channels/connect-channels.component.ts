import { Component } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-connect-channels',
  templateUrl: './connect-channels.component.html',
  styleUrls: ['./connect-channels.component.scss']
})
export class ConnectChannelsComponent {
  constructor(private _hS: HeaderService, private sidenavService: SidenavService) {
    _hS.updateHeaderData({
      title: 'Connect Channels',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class:"fa-light fa-message-bot pe-2"
    })
  }
}
