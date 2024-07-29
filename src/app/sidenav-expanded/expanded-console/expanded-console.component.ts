import { Component } from '@angular/core';
import { ChatVisibilityService } from 'src/app/services/chat-visibility.service';
import { SidenavService } from 'src/app/services/sidenav.service';
declare var toggleNavPanel: any;

@Component({
  selector: 'app-expanded-console',
  templateUrl: './expanded-console.component.html',
  styleUrls: ['./expanded-console.component.scss']
})
export class ExpandedConsoleComponent {
  public activeTab: any;

  activeIndex = 0;
  isActive = false;
  headerTitle = "Console"

  subMenus = [
    { DisplayName: "Bot Management", RouteName: "" ,expanded: false, isChild: true, class:"fa-light fa-gears pe-2",
  Children: [
    // { DisplayName: "Menu Bot", RouteName: "console/bot-management/menu-bot", expanded: false, isChild: false},
    { DisplayName: "Conversational Bot", RouteName: "console/bot-management/conversational-bot" ,expanded: false, isChild: false},
    { DisplayName: "Configurations", RouteName: "console/bot-management/configurations", expanded: false, isChild: false },
    // { DisplayName: "Templates", RouteName: "console/bot-management/templates", expanded: false, isChild: false },
  ]
  },
    { DisplayName: "Event Logs", RouteName: "console/event-logs" ,expanded: false, isChild: false, class:"fa-light fa-list pe-2"},
    // { DisplayName: "Intent Bot", RouteName: "console/intent-bot" ,expanded: false, isChild: false, class:"fal fa-eye pe-2"},
   
    // { DisplayName: "Rules Bot", RouteName: "console/rules-bot" ,expanded: false, isChild: false, class:"fal fa-eye pe-2"},
    { DisplayName: "Connect Channels", RouteName: "console/connect-channels", expanded: false, isChild: false, class:"fa-light fa-message-bot pe-2"},
    
    { DisplayName: "User Management", RouteName: "console/users", expanded: false , isChild: false, class:"fal fa-users pe-2"},
    { DisplayName: "Tags", RouteName: "console/tags", expanded: false, isChild: false, class:"fal fa-tags pe-2" },
    { DisplayName: "Knowledge Base", RouteName: "console/knowledge-base", expanded: false , isChild: false, class:"fal fa-book-open pe-2"},
    { DisplayName: "Settings", RouteName: "console/settings", expanded: false, isChild: false, class:"fa-light fa-gear pe-2" }

  ];

  constructor(private sidenavService: SidenavService, private chatVisibilityServicee : ChatVisibilityService) {
  }
  toggleCollapse(menu: any) {
      menu.expanded = !menu.expanded;
      // if(menu.DisplayName == " Bot Monitoring "){
      //   this.sidenavService.updateMessage("Bot Conversation")
      // }
      // else if(menu.DisplayName == " Escalation Matrix "){
      //   this.sidenavService.updateMessage("Bot Escalation")
      // }
  }

  ngOnInit(): void {
    this.chatVisibilityServicee.refreshHistoryArray = [];

  }
  activeMenu(index:any) {
    this.activeIndex = index;
    this.isActive = true;
  }
  
  toggle() {
  }

  toggleNavTest() {
    toggleNavPanel();
  }

}
