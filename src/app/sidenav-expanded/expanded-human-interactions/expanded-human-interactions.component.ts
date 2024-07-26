import { Component } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Location } from "@angular/common";
import { HeaderService } from 'src/app/services/header.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { BotMonitoringService } from 'src/app/main/main/ai-bot/bot-monitoring.service';
import { ChatVisibilityService } from 'src/app/services/chat-visibility.service';
import { ChatVisibiltyHumanInteractionService } from 'src/app/services/chat-visibilty-human-interaction.service';

declare var toggleNavPanel: any;
@Component({
  selector: 'app-expanded-human-interactions',
  templateUrl: './expanded-human-interactions.component.html',
  styleUrls: ['./expanded-human-interactions.component.scss']
})
export class ExpandedHumanInteractionsComponent {
  activeIndex = 0;
  isActive = false;
  searchText: any = '';

  activechatBotHistory: any = [];
  defaultchatBotHistory: any = [];
  completedConversation: any[] = [];
  showBotMonitoringContent: boolean = false;
  interval: any;
  constructor(private chatVisibilityService: ChatVisibiltyHumanInteractionService,
    private headerService: HeaderService, private _botService: BotMonitoringService,
    private _route:Router,private _sharedS:SharedService
    ,private _spinner:NgxSpinnerService,private sidenavService:SidenavService, private location: Location) {
      console.log("Bot History Menu ")

  }

  ngOnInit(): void {
    // this.chatVisibilityServicee.refreshHistoryArray = [];

    this.getChatBotHistory();
    this.chatVisibilityService.thirdActiveHistory$.subscribe((obj: any) => {
      if (obj) {
        const index = this.activechatBotHistory.findIndex((item: any) => item.slug === obj.slug)
        this.activechatBotHistory[index]['active'] = obj.active;
      }

    })

    this.interval = setInterval(() => {
      this.getChatBotHistoryonRefresh();
    }, 15000)
  }

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
    
    this.chatVisibilityService.notifyNewChatIdHistory(clickedItem);
  }

  goBack() {
    this._sharedS.setShowGenerativeMenu('');
  }
  getChatBotHistory() {
    this._spinner.show('chat-history-menu3');
    
    this._botService.chatBotHistoryForHumanInteraction().subscribe((res: any) => {
      res.slugs = this.transformResponse(res);
      res.slugs.forEach((item: any, index: any) => {
        item.name = "Unknown" + `${index + 1}`
        item['active'] = false;
      })
      if(res.slugs.length>0){
         this._spinner.hide('chat-history-menu3');
        this.activechatBotHistory = res.slugs;
      }

    },
      (error: any) => {
        alert('Service unavailable');
      })



  }


  transformResponse(response: any) {
    return Object.keys(response.count).map(key => ({
      slug: key,
    }));
  }


  getChatBotHistoryonRefresh() {
    this._spinner.show('chat-history-menu3');
    
    this._botService.chatBotHistoryForHumanInteraction().subscribe((res: any) => {
      res.slugs = this.transformResponse(res);
      res.slugs.forEach((item: any, index: any) => {
        item.name = "Unknown" + `${index + 1}`
        item['active'] = false;
      })
      if(res.slugs.length>0){
         this._spinner.hide('chat-history-menu3');
        this.activechatBotHistory = res.slugs;
      }
      this.chatVisibilityService.refreshHistoryArray.forEach((slug)=>{
        
        this.activechatBotHistory.forEach((item:any)=>{
          if(item.slug == slug){
            item.active = true;
          }
        })
      })
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
