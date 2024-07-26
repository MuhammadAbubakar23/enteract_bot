import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }
  chatBotBaseUrl = environment.chatBotBaseUrl
  getTotalBotConversation = environment.link.analytics.getTotalBotConversation
  tokenPerDay = environment.link.analytics.tokenPerDay
  totalToken = environment.link.analytics.totalToken
  avgToken = environment.link.analytics.avgToken
  fallBackCount = environment.link.analytics.fallBackCount
  timeoutCount = environment.link.analytics.timeoutCount


  GetTotalBotConversation() {
    return this.http.get(this.chatBotBaseUrl + this.getTotalBotConversation)
  }
  TokenPerDay() {
    return this.http.get(this.chatBotBaseUrl + this.tokenPerDay)
  }
  TotalToken() {
    return this.http.get(this.chatBotBaseUrl + this.totalToken)
  }
  AvgToken() {
    return this.http.get(this.chatBotBaseUrl + this.avgToken)
  }
  FallBackCount() {
    return this.http.get(this.chatBotBaseUrl + this.fallBackCount)
  }
  TimeoutCount() {
    return this.http.get(this.chatBotBaseUrl + this.timeoutCount)
  }
}
