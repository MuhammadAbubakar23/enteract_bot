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
  getTotalAgents = environment.link.analytics.getTotalAgents
  avgBotConversationTime = environment.link.analytics.avgBotConversationTime
  botEsclationRate = environment.link.analytics.botEsclationRate
  avgWaitTime = environment.link.analytics.avgWaitTime
  sentimentAnalysis = environment.link.analytics.sentimentAnalysis
  tagsAnalatics = environment.link.analytics.tagsAnalatics
  peakHours = environment.link.analytics.peakHours
  totalToken = environment.link.analytics.totalToken
  tokenPerDay = environment.link.analytics.tokenPerDay

  avgToken = environment.link.analytics.avgToken
  fallBackCount = environment.link.analytics.fallBackCount
  timeoutCount = environment.link.analytics.timeoutCount
  


  GetTotalBotConversation() {
    return this.http.get(this.chatBotBaseUrl + this.getTotalBotConversation)
  }
  GetTotalAgents() {
    return this.http.get(this.chatBotBaseUrl + this.getTotalAgents)
  }
  GetAvgBotConversationTime() {
    return this.http.get(this.chatBotBaseUrl + this.avgBotConversationTime)
  }
  GetBotEsclationRate() {
    return this.http.get(this.chatBotBaseUrl + this.botEsclationRate)
  }
  GetAvgWaitTime() {
    return this.http.get(this.chatBotBaseUrl + this.avgWaitTime)
  }
  GetSentimentAnalysis() {
    return this.http.get(this.chatBotBaseUrl + this.sentimentAnalysis)
  }  
  GetTagsAnalatics() {
    return this.http.get(this.chatBotBaseUrl + this.tagsAnalatics)
  }
  GetPeakHours() {
    return this.http.get(this.chatBotBaseUrl + this.peakHours)
  }
  TotalToken() {
    return this.http.get(this.chatBotBaseUrl + this.totalToken)
  }
  AvgToken() {
    return this.http.get(this.chatBotBaseUrl + this.avgToken)
  }
  TimeoutCount() {
    return this.http.get(this.chatBotBaseUrl + this.timeoutCount)
  }
  TokenPerDay() {
    return this.http.get(this.chatBotBaseUrl + this.tokenPerDay)
  }


  FallBackCount() {
    return this.http.get(this.chatBotBaseUrl + this.fallBackCount)
  }

}
