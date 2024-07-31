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

  activeIndex :any= 0;
  isActive = false;
  activeParentIndex: number | null = null;
  activeChildIndex: number | null = null;
  expandedIndex: number | null = null;
  public activeTab: any;
  headerTitle = "Ai Bot Analytics"

  subMenus = [
    { DisplayName: " Analytics ", RouteName: "analytics/ai-bot-analytics" ,expanded: false, isChild: false, class:"fal fa-eye pe-2",Children:[]},
    { DisplayName: " Conversation ", RouteName: "analytics/conversation-analytics", expanded: false, isChild: false, class:"fal fa-cubes pe-2",Children:[]},
    { DisplayName: "Bot KPI's", RouteName: "analytics/bot-kpi", expanded: false, isChild: false, class:"fa-light fa-calendar pe-2", Children:[]},
    { DisplayName: "Sentiments and Tags", RouteName: "analytics/sentiments-and-tags", expanded: false, isChild: false, class:"fa-light fa-eye-slash pe-2",Children:[] },
    { DisplayName: "Tokens", RouteName: "analytics/tokens", expanded: false , isChild: false, class:"fa-light fa-upload pe-2",Children:[]},
  ];

  constructor(private sidenavService: SidenavService, private chatVisibilityService : ChatVisibilityService) {
  }


  ngOnInit(): void {
    this.activeParentIndex = 0;
    this.expandedIndex = 0;
    this.chatVisibilityService.refreshHistoryArray = [];
  }

  toggleCollapse(menu: any, index: number) {
    if (this.expandedIndex !== index) {
      this.expandedIndex = index;
      this.activeChildIndex = null; 
    } else {
      this.expandedIndex = null; 
    }
    this.activeParentIndex = index; 
  }

  activeMenu(parentIndex: number, childIndex: number) {
    this.activeParentIndex = parentIndex;
    this.activeChildIndex = childIndex;
  }
  
  toggle() {
    ;
  }

  toggleNavTest() {
    toggleNavPanel();
  }

}
