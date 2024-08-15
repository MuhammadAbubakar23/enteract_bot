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
  humanAgentCsat = environment.link.analytics.humanAgentCsat
  tagsAnalatics = environment.link.analytics.tagsAnalatics
  peakHours = environment.link.analytics.peakHours
  totalToken = environment.link.analytics.totalToken
  conversationOverTime = environment.link.analytics.conversationOverTime
  tokenPerDay = environment.link.analytics.tokenPerDay
  baseUrlAI = environment.baseUrlAI
  avgToken = environment.link.analytics.avgToken
  fallBackCount = environment.link.analytics.fallBackCount
  timeoutCount = environment.link.analytics.timeoutCount
  humanTransferRate = environment.link.analytics.humanTransferRate
  averageTokenPerChat = environment.link.analytics.averageTokenPerChat
  totalBotSessionsOvertime = environment.link.analytics.totalBotSessionsOvertime
  


  GetTotalBotConversation() {
    return this.http.get(this.chatBotBaseUrl + this.getTotalBotConversation + `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
  }
  GetTotalAgents() {
    return this.http.get(this.chatBotBaseUrl + this.getTotalAgents)
  }
  GetAvgBotConversationTime() {
    return this.http.get(this.chatBotBaseUrl + this.avgBotConversationTime + `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
  }
  GetBotEsclationRate() {
    return this.http.get(this.chatBotBaseUrl + this.botEsclationRate + `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
  }
  GetAvgWaitTime() {
    return this.http.get(this.chatBotBaseUrl + this.avgWaitTime+ `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
  }
  GetSentimentAnalysis() {
    return this.http.get(this.chatBotBaseUrl + this.sentimentAnalysis + `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
  }  
  GetHumanAgentCsat(){
    return this.http.get(this.chatBotBaseUrl + this.humanAgentCsat + `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
  }
  GetTagsAnalatics() {
    return this.http.get(this.chatBotBaseUrl + this.tagsAnalatics+ `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
  }
  GetPeakHours() {
    return this.http.get(this.chatBotBaseUrl + this.peakHours+ `&filter_days=7`)
  }
  TotalToken() {
    return this.http.get(this.chatBotBaseUrl + this.totalToken+ `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
  }
  AvgToken() {
    return this.http.get(this.chatBotBaseUrl + this.avgToken+ `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
  }
  TimeoutCount() {
    return this.http.get(this.chatBotBaseUrl + this.timeoutCount+ `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
  }
  TokenPerDay() {
    return this.http.get(this.chatBotBaseUrl + this.tokenPerDay + `&filter_days=${localStorage.getItem("filterDays")}`)
  }


  FallBackCount() {
    return this.http.get(this.chatBotBaseUrl + this.fallBackCount)
  }

  ConversationOverTimeData(botId:any){
    // return this.http.get(this.chatBotBaseUrl + this.conversationOverTime + `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
    return this.http.get(this.chatBotBaseUrl + this.conversationOverTime + `?bot_id=${environment.bot_id}&filter_days=7`)
    // return this.http.get('http://52.77.162.250:5005/analytics/conversations_over_time?bot_id=7&filter_days=7')
  }

  GethumanTransferRate(){
    // return this.http.get(this.chatBotBaseUrl + this.humanTransferRate + `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
    return this.http.get(this.chatBotBaseUrl + this.humanTransferRate + `?bot_id=${environment.bot_id}&filter_days=7`)
  }

  GetAverageTokenPerChat(){
    // return this.http.get(this.chatBotBaseUrl + this.averageTokenPerChat + `?bot_id=${environment.bot_id}&filter_days=${localStorage.getItem("filterDays")}`)
    return this.http.get(this.chatBotBaseUrl + this.averageTokenPerChat + `?bot_id=${environment.bot_id}&filter_days=7`)
  }

  GetTotalBotSessionsOvertime(){
    return this.http.get(this.chatBotBaseUrl + this.totalBotSessionsOvertime + `?bot_id=${environment.bot_id}&filter_days=7`)
  }
}
