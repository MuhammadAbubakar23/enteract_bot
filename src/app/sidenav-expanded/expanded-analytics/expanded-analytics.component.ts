import { Component } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ChatVisibilityService } from 'src/app/services/chat-visibility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/authService/auth.service';
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
  activeChildIndex: number | null = 0;
  expandedIndex: number | null = 0;
  public activeTab: any;
  headerTitle = "Ai Bot Analytics"
  subMenus = JSON.parse(localStorage.getItem("analyticsSubMenus") || '[]');
  // subMenus = [
  //   { DisplayName: " Analytics ", RouteName: "analytics/ai-bot-analytics" ,expanded: false, isChild: false, class:"fal fa-eye pe-2",Children:[]},
  //   { DisplayName: "Dashboard", RouteName: "analytics/ai-dashboard", expanded: false , isChild: false, class:"fa-light fa-chart-line-up pe-2",Children:[]},
  //   { DisplayName: " Conversation ", RouteName: "analytics/conversation-analytics", expanded: false, isChild: false, class:"fal fa-cubes pe-2",Children:[]},
  //   { DisplayName: "Bot KPI's", RouteName: "analytics/bot-kpi", expanded: false, isChild: false, class:"fa-light fa-calendar pe-2", Children:[]},
  //   { DisplayName: "Sentiments and Tags", RouteName: "analytics/sentiments-and-tags", expanded: false, isChild: false, class:"fa-light fa-eye-slash pe-2",Children:[] },
  //   { DisplayName: "Tokens", RouteName: "analytics/tokens", expanded: false , isChild: false, class:"fa-light fa-upload pe-2",Children:[]},
  // ];

  constructor(private storageService: AuthService,private sidenavService: SidenavService, private chatVisibilityService : ChatVisibilityService, private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit(): void {
    this.storageService.subMenus$.subscribe(subMenus => {
      this.subMenus = subMenus;
    });
    const segments = this.router.url.split('/').filter(segment => segment);
    const lastTwoSegments = segments.slice(-1).join('/');
    this.subMenus.forEach((menu:any, parentIndex:any) => {
      if (menu.link === lastTwoSegments) {
        this.activeParentIndex = parentIndex;
        this.activeChildIndex = null;
      }
    });

    this.chatVisibilityService.refreshHistoryArray = [];
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

  // activeMenu(childIndex: number) {
  //   this.activeParentIndex = null;
  //   this.activeChildIndex = childIndex;
  // }
  
  toggle() {
    ;
  }

  toggleNavTest() {
    toggleNavPanel();
  }

}
