import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  activeChildIndex: number | null = 0;
  expandedIndex: number | null = 0;

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

  constructor(private sidenavService: SidenavService, private chatVisibilityServicee : ChatVisibilityService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    // 
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
      const segments = this.router.url.split('/').filter(segment => segment);
      const lastTwoSegments = segments.slice(-2).join('/');
  
      this.subMenus.forEach((menu, parentIndex) => {
        if (menu.RouteName === lastTwoSegments) {
          this.activeParentIndex = parentIndex;
          this.activeChildIndex = null;
        }
  
        menu.Children.forEach((child, childIndex) => {
          if (child.RouteName === lastTwoSegments) {
            this.activeParentIndex = parentIndex;
            this.activeChildIndex = childIndex;
          }
        });
      });
    //}
    this.chatVisibilityServicee.refreshHistoryArray = [];
  }

  toggleCollapse(index: number) {
    if (this.expandedIndex !== index) {
      this.expandedIndex = index;
      this.activeChildIndex = null; 
    } else {
      this.expandedIndex = null; 
    }
    this.activeParentIndex = index; 
  }

  activeMenu(childIndex: number) {
    this.activeParentIndex = null;
    this.activeChildIndex = childIndex;
  }

  toggle() {
  }

  toggleNavTest() {
    toggleNavPanel();
  }

}
