import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  // menus = [
  //   {
  //     Name: 'Analytics',
  //     DisplayName: 'Analytics',
  //     RouteName: '/bot/analytics/ai-bot-analytics',
  //     iconClass: 'fa-light fa-chart-line-up ice'
  //   },
  //   {
  //     Name: 'Bot Interactions',
  //     DisplayName: 'Bot Interactions',
  //     RouteName: '/bot/ai-bot/bot-interaction',
  //     iconClass: 'fa-light fa-microchip-ai ice'
  //   },
  //   {
  //     Name: 'Chat History',
  //     DisplayName: 'Chat History',
  //     RouteName: '/bot/chat-history/conversations',
  //     iconClass: 'fa-light fa-message-captions ice'
  //   },
  //   {
  //     Name: 'Human Interactions',
  //     DisplayName: 'Human Interactions',
  //     RouteName: '/bot/human-interactions/conversations',
  //     iconClass: 'fa-light fa-message-bot ice'
  //   },
  //   {
  //     Name: 'Console',
  //     DisplayName: 'Console',
  //     RouteName: '/bot/console/event-logs',
  //     iconClass: 'fal fa-cog ice'
  //   }
  // ];
  menus:any =[];

  ConsoleRouteName = '/bot/console/bot-management/conversational-bot';
  // activeConsole = false;
  activeIndex = 0;
  isActive = false;
  analyticsSubMenus: any;
  consoleSubMenus: any;
  constructor(private sidenavService: SidenavService, private router: Router) { }
  ngOnInit(): void {
    this.getMenus();
    const urlSegments = this.router.url.split('/');
    let moduleSegment = urlSegments[2];
    let moduleSegment2 = urlSegments.slice(-2).join('/')
    this.activeIndex = this.menus.findIndex((item:any )=> item.link === moduleSegment);
    if(this.activeIndex == -1){
      this.activeIndex = this.menus.findIndex((item:any )=> item.link === moduleSegment2);
    }
    // if(this.activeIndex == -1) this.activeConsole = true;
    // else this.activeConsole = false;
  }

  // getMenus() {
  //   let menus = JSON.parse(localStorage.getItem('Menus') || '');
  //   this.menus = menus.filter((item: any) => item.ParentId === null);
  // }
  activeMenu(index: any, name: any) {
    this.activeIndex = index;
    this.isActive = true;
    this.sidenavService.updateMessage(name);

    // if(name == 'Console'){
    //   this.activeConsole = true;
    // }
    // else this.activeConsole = false;
    localStorage.setItem('analyticActiveParentIndex', '0');
    localStorage.setItem('consoleActiveParentIndex', '0');
  }


  getMenus() {
    if(!localStorage.getItem("BotMenuPreviews")){
      this.sidenavService.getMenus()?.subscribe(
        (res: any) => {
          if (res){
            this.menus = res;
            this.analyticsSubMenus = this.menus.find( (menu:any) => menu.name == "Analytics")
            this.consoleSubMenus = this.menus.find( (menu:any) => menu.name == "Console")
            localStorage.setItem("BotMenuPreviews",JSON.stringify(res))
            localStorage.setItem("analyticsSubMenus", JSON.stringify(this.analyticsSubMenus?.subMenu))
            localStorage.setItem("consoleSubMenus", JSON.stringify(this.consoleSubMenus?.subMenu))
            //this.menus = this.menus.filter((item: any) => item.ParentId === null);
          }
        }, (error: any) => {
          console.error("Internal Server Error", error);
          const toasterObject = { isShown: true, isSuccess: false, toastHeading: "Failed", toastParagrahp: "Internal Server Error!" }
      });
    }
    else{
      this.menus = JSON.parse(localStorage.getItem("BotMenuPreviews")||'[]')
      this.analyticsSubMenus = this.menus.find( (menu:any) => menu.name == "Analytics")
      this.consoleSubMenus = this.menus.find( (menu:any) => menu.name == "Console")
    }

  }
}
