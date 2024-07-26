import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-bot-monitoring',
  templateUrl: './bot-monitoring.component.html',
  styleUrls: ['./bot-monitoring.component.scss']
})
export class BotMonitoringComponent implements OnInit{
  constructor(private _hS: HeaderService, private sidenavService: SidenavService) {
    _hS.updateHeaderData({
      title: 'Bot Interactions',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class: "fa-light fa-message-bot"
    })
  }
  ngOnInit(): void {
  }
}
