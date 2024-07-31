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
  activeParentIndex: number | null = null;
  activeChildIndex: number | null = null;
  expandedIndex: number | null = null;

  activeIndex = 0;
  isActive = false;
  headerTitle = "Console"

  subMenus = [
    { DisplayName: "Bot Management", RouteName: "" ,expanded: false, isChild: true, class:"fa-light fa-gears pe-2",
    Children: [
    // { DisplayName: "Menu Bot", RouteName: "console/bot-management/menu-bot", expanded: false, isChild: false},
    { DisplayName: "Conversational Bot", RouteName: "console/bot-management/conversational-bot" ,expanded: false, isChild: false},
    // { DisplayName: "Configurations", RouteName: "console/bot-management/configurations", expanded: false, isChild: false },
    // { DisplayName: "Templates", RouteName: "console/bot-management/templates", expanded: false, isChild: false },
  ]
  },
    { DisplayName: "Event Logs", RouteName: "console/event-logs" ,expanded: false, isChild: false, class:"fa-light fa-list pe-2",Children: []},
    // { DisplayName: "Intent Bot", RouteName: "console/intent-bot" ,expanded: false, isChild: false, class:"fal fa-eye pe-2"},
   
    // { DisplayName: "Rules Bot", RouteName: "console/rules-bot" ,expanded: false, isChild: false, class:"fal fa-eye pe-2"},
    { DisplayName: "Connect Channels", RouteName: "console/connect-channels", expanded: false, isChild: false, class:"fa-light fa-message-bot pe-2",Children: []},
    
    { DisplayName: "User Management", RouteName: "console/users", expanded: false , isChild: false, class:"fal fa-users pe-2",  Children: []},
    { DisplayName: "Tags", RouteName: "console/tags", expanded: false, isChild: false, class:"fal fa-tags pe-2",Children: [] },
    { DisplayName: "Knowledge Base", RouteName: "console/knowledge-base", expanded: false , isChild: false, class:"fal fa-book-open pe-2",Children: []},
    { DisplayName: "Settings", RouteName: "console/settings", expanded: false, isChild: false, class:"fa-light fa-gear pe-2" ,Children: []}

  ];

  constructor(private sidenavService: SidenavService, private chatVisibilityServicee : ChatVisibilityService) {
  }

  ngOnInit(): void {
    // debugger
    // const storedParentValue = localStorage.getItem('consoleActiveParentIndex');
    // const storedChildValue = localStorage.getItem('consoleActiveChildIndex');
    // let parnetindex = 0;
    // let childIndex = 0;
    // if (storedParentValue != null) {parnetindex = parseInt(storedParentValue);}
    // if (storedChildValue != null) {childIndex = parseInt(storedChildValue);}


    // if(parnetindex > 0 || childIndex > 0)
    // {
    //   this.activeParentIndex = parnetindex;
    //   this.expandedIndex = 0;
    // }else{
      this.activeParentIndex = 0;
      this.activeChildIndex = 0;
      this.expandedIndex = 0;
    //}
    this.chatVisibilityServicee.refreshHistoryArray = [];
  }

  toggleCollapse(menu: any, index: number) {
    if (this.expandedIndex !== index) {
      this.expandedIndex = index;
      this.activeChildIndex = null; 
    } else {
      this.expandedIndex = null; 
    }
    this.activeParentIndex = index; 
    //localStorage.setItem('consoleActiveParentIndex', index.toString());
  }

  activeMenu(parentIndex: number, childIndex: number) {
    this.activeParentIndex = parentIndex;
    this.activeChildIndex = childIndex;
  }

  toggle() {
  }

  toggleNavTest() {
    toggleNavPanel();
  }

}
