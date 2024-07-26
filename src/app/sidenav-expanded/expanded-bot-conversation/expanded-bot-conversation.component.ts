import { Component } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Location } from "@angular/common";
import { HeaderService } from 'src/app/services/header.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { BotMonitoringService } from 'src/app/main/main/ai-bot/bot-monitoring.service';
import { ChatVisibilityService } from 'src/app/services/chat-visibility.service';
declare var toggleNavPanel: any;
@Component({
  selector: 'app-expanded-bot-conversation',
  templateUrl: './expanded-bot-conversation.component.html',
  styleUrls: ['./expanded-bot-conversation.component.scss']
})
export class ExpandedBotConversationComponent {
//   constructor(private sidenavService:SidenavService, private location: Location){

//   }
//   updateSidenav(){
//     this.sidenavService.updateMessage("AI Bot")
//   }
// }

// menuItems: any[] = [];
//   subMenus = [
//     {
//       "DisplayName": " Chat BOT ",
//       "RouteName": "/bot-monitoring/chat-bot",
//       "Icon": "",
//       "isChild": false,
//       "Children": [

//         {
//           "DisplayName": "Component",
//           "RouteName": "/bot-monitoring/chat-bot/components"
//         },

//       ]
//     }
//   ];
  activeIndex = 0;
  isActive = false;
  searchText: any = '';

  activechatBotHistory: any = [];
  defaultchatBotHistory: any = [];
  completedConversation: any[] = [];
  showBotMonitoringContent: boolean = false;
  interval: any;
  constructor(private chatVisibilityService: ChatVisibilityService,
    private headerService: HeaderService, private _botService: BotMonitoringService,
    private _route:Router,private _sharedS:SharedService
    ,private _spinner:NgxSpinnerService,private sidenavService:SidenavService, private location: Location) {
      console.log("Bot History Menu ")

  }

  ngOnInit(): void {
    // debugger
    // this.chatVisibilityService.refreshHistoryArray
    this.getChatBotHistory();
    this.chatVisibilityService.thirdActiveHistory$.subscribe((obj: any) => {
      if (obj) {
        debugger
        const index = this.activechatBotHistory.findIndex((item: any) => item.slug === obj.slug)
        if(index!=-1){
          this.activechatBotHistory[index]['active'] = obj.active;
        }
        
      }

    })

    this.interval = setInterval(() => {
      this.getChatBotHistoryonRefresh();
    }, 15000)
  }
  // updatevalue(string: any) {

  //   if (string === 'generative-bot-history') {
  //     this.showBotMonitoringContent = true;
  //   }
  //   else if (string === "bot-monitoring-chat") {
  //     this._route.navigateByUrl('/bot-monitoring/bot-monitoring-chat');
  //   }
  //   else {
  //     this.showBotMonitoringContent = false;
  //     this.headerService.updateMessage(string);
  //   }
  // }
  // activeMenu(index: any) {
  //   this.activeIndex = index;
  //   this.isActive = true;
  //   this.updatevalue('component')
  // }
  filterResults(text: string) {

    if (!this.searchText) {
      this.activechatBotHistory = this.defaultchatBotHistory.slice();
      return;
    }
    this.activechatBotHistory = this.defaultchatBotHistory.filter(
      (item: any) => item?.name.toLowerCase().includes(this.searchText.toLowerCase())
    );

  }
  toggleChatVisibility(clickedItem: any) {
    
    // clickedItem.active = !clickedItem.active;
    this.chatVisibilityService.notifyNewChatIdHistory(clickedItem);
  }
  // resetMenu() {
  //   this._botSubMenuStatus.setActiveMenu(false);
  //   this.updatevalue('chat')
  // }
  // updateSidenav(){
  //       this.sidenavService.updateMessage("Bot Interactions")
  //     }
  goBack() {
    this._sharedS.setShowGenerativeMenu('');
  }
  getChatBotHistory() {
    this._spinner.show('chat-history-menu1');
    
    this._botService.chatBotHistory().subscribe((res: any) => {
      res.slugs.forEach((item: any, index: any) => {
        item.name = "Unknown" + `${index + 1}`
        item['active'] = false;
      })
      if(res.slugs.length>0){
         this._spinner.hide('chat-history-menu1');
        this.activechatBotHistory = res.slugs;
      }
    },
      (error: any) => {
        alert('Service unavailable');
      })



  }


  getChatBotHistoryonRefresh() {
    //this._spinner.show('chat-history-menu1');
    
    this._botService.chatBotHistory().subscribe((res: any) => {
      res.slugs.forEach((item: any, index: any) => {
        item.name = "Unknown" + `${index + 1}`
        item['active'] = false;
      })
      if(res.slugs.length>0){
         //this._spinner.hide('chat-history-menu1');
        this.activechatBotHistory = res.slugs;
      }
      
      this.chatVisibilityService.refreshHistoryArray.forEach((slug)=>{
        
        this.activechatBotHistory.forEach((item:any)=>{
          if(item.slug == slug){
            item.active = true;
          }
        })
      })
    },
      (error: any) => {
        alert('Service unavailable');
      })



  }

  toggle() {
    ;
  }

  toggleNavTest() {
    toggleNavPanel();
  }
  ngOnDestroy(){
    clearInterval(this.interval);
  }
}
