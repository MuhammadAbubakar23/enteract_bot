import { Component } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ChatVisibilityService } from 'src/app/services/chat-visibility.service';
declare var toggleNavPanel: any;
@Component({
  selector: 'app-expanded-analytics',
  templateUrl: './expanded-analytics.component.html',
  styleUrls: ['./expanded-analytics.component.scss']
})
export class ExpandedAnalyticsComponent {

  public activeTab: any;

  activeIndex = 0;
  isActive = false;
  headerTitle = "Ai Bot Analytics"

  subMenus = [
    { DisplayName: " Analytics ", RouteName: "analytics/ai-bot-analytics" ,expanded: false, isChild: false, class:"fal fa-eye pe-2"},
    { DisplayName: " Conversation ", RouteName: "analytics/conversation-analytics", expanded: false, isChild: false, class:"fal fa-cubes pe-2"},
    { DisplayName: "Bot KPI's", RouteName: "analytics/bot-kpi", expanded: false, isChild: false, class:"fa-light fa-calendar pe-2" },
    { DisplayName: "Sentiments and Tags", RouteName: "analytics/sentiments-and-tags", expanded: false, isChild: false, class:"fa-light fa-eye-slash pe-2" },
    { DisplayName: "Tokens", RouteName: "analytics/tokens", expanded: false , isChild: false, class:"fa-light fa-upload pe-2"},
  ];

  constructor(private sidenavService: SidenavService, private chatVisibilityService : ChatVisibilityService) {
  }
  toggleCollapse(menu: any) {
    debugger
      menu.expanded = !menu.expanded;
      // if(menu.DisplayName == " Bot Monitoring "){
      //   this.sidenavService.updateMessage("Bot Conversation")
      // }
      // else if(menu.DisplayName == " Escalation Matrix "){
      //   this.sidenavService.updateMessage("Bot Escalation")
      // }
  }

  ngOnInit(): void {
    this.chatVisibilityService.refreshHistoryArray = [];
  }
  // activeMenu(index) {
  //   this.activeIndex = index;
  //   this.isActive = true;
  // }
  
  toggle() {
    ;
  }

  toggleNavTest() {
    toggleNavPanel();
  }

}
