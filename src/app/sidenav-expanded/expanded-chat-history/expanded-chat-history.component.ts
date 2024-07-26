import { Component } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Location } from "@angular/common";
import { HeaderService } from 'src/app/services/header.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { BotMonitoringService } from 'src/app/main/main/ai-bot/bot-monitoring.service';
import { ChatHistoryVisibilityServiceService } from 'src/app/services/chat-history-visibility-service.service';

declare var toggleNavPanel: any;
@Component({
  selector: 'app-expanded-chat-history',
  templateUrl: './expanded-chat-history.component.html',
  styleUrls: ['./expanded-chat-history.component.scss']
})
export class ExpandedChatHistoryComponent {

  activeIndex = 0;
  isActive = false;
  searchText: any = '';

  activechatBotHistory: any = [];
  defaultchatBotHistory: any = [];
  completedConversation: any[] = [];
  showBotMonitoringContent: boolean = false;
  interval: any;
  constructor(private chatVisibilityService: ChatHistoryVisibilityServiceService,
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
    debugger
    this.chatVisibilityService.notifyNewChatIdHistory(clickedItem);
  }

  goBack() {
    this._sharedS.setShowGenerativeMenu('');
  }
  getChatBotHistory() {
    this._spinner.show('chat-history-menu');
    
    this._botService.chatBotHistoryForChatHistoryModule().subscribe((res: any) => {
      res.slugs = this.transformLogsResponse(res);
      debugger
      res.slugs.forEach((item: any, index: any) => {
        item.name = "Unknown" + `${index + 1}`
        item['active'] = false;
      })
      if(res.slugs.length>0){
         this._spinner.hide('chat-history-menu');
        this.activechatBotHistory = res.slugs;
      }
      debugger
    },
      (error: any) => {
        alert('Service unavailable');
      })
  }

  transformLogsResponse(response: any) {
    return Object.keys(response.all_logs).map(slug => ({
      slug: slug,
      historyApiresponse: [{ history: response.all_logs[slug] }]
      // history: response.all_logs[slug]
    }));
  }

  getChatBotHistoryonRefresh() {
    this._spinner.show('chat-history-menu');
    
    this._botService.chatBotHistoryForChatHistoryModule().subscribe((res: any) => {
      res.slugs = this.transformLogsResponse(res);

      res.slugs.forEach((item: any, index: any) => {
        item.name = "Unknown" + `${index + 1}`
        item['active'] = false;
      })
      if(res.slugs.length>0){
         this._spinner.hide('chat-history-menu');
        this.activechatBotHistory = res.slugs;
      }
      this.chatVisibilityService.refreshHistoryArray.forEach((slug)=>{
        debugger
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
    this.chatVisibilityService.refreshHistoryArray = []
    clearInterval(this.interval);
  }
}


// i want to have this format:
// [
//   {
//     slug: "05b429d4-ad2b-4734-98b1-57add915f902",
//     historyApiresponse:[
//       {
//         history: [
//           {
//               "chatId": 330,
//               "content": "hi",
//               "role": "user",
//               "sentAt": 1721664654
//           },
//           {
//               "chatId": 330,
//               "content": "Hello! Would you like to converse in English or Arabic?",
//               "feedbackScore": null,
//               "role": "assistant",
//               "sentAt": 1721664654,
//               "sources": [],
//               "type": "chat"
//           },
//           {
//               "chatId": 331,
//               "content": "hi",
//               "role": "user",
//               "sentAt": 1721664660
//           },
//           {
//               "chatId": 331,
//               "content": "I didn't quite catch that. Would you like to converse in English or Arabic?",
//               "feedbackScore": null,
//               "role": "assistant",
//               "sentAt": 1721664660,
//               "sources": [],
//               "type": "chat"
//           },
//           {
//               "chatId": 332,
//               "content": "hi",
//               "role": "user",
//               "sentAt": 1721664667
//           },
//           {
//               "chatId": 332,
//               "content": "Let's start fresh. I'd like to know, would you like to converse in English or Arabic?",
//               "feedbackScore": null,
//               "role": "assistant",
//               "sentAt": 1721664667,
//               "sources": [],
//               "type": "chat"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     slug:  "072f2f89-18ac-4266-ba3a-7079eac43ca3",
//     historyApiresponse:[
//       {
//         history: [
//           {
//               "chatId": 344,
//               "content": "Hi",
//               "role": "user",
//               "sentAt": 1721726190
//           },
//           {
//               "chatId": 344,
//               "content": "Hello! Would you like to converse in English or Arabic?",
//               "feedbackScore": null,
//               "role": "assistant",
//               "sentAt": 1721726190,
//               "sources": [],
//               "type": "chat"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     slug:  "131fa692-67b0-4fda-a42a-220cbef1c280",
//     historyApiresponse:[
//       {
//         history: [
//           {
//               "chatId": 341,
//               "content": "Hi",
//               "role": "user",
//               "sentAt": 1721726029
//           },
//           {
//               "chatId": 341,
//               "content": "Hello! Would you like to converse in English or Arabic?",
//               "feedbackScore": null,
//               "role": "assistant",
//               "sentAt": 1721726029,
//               "sources": [],
//               "type": "chat"
//           }
//         ]
//       }
//     ]
//   }
// ]