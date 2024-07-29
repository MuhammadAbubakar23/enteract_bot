import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotMonitoringService {
  chatBotBaseUrl = environment.chatBotBaseUrl
  constructor(private http: HttpClient) { }
  ChatWdidget(form: any) {
    return this.http.post(this.chatBotBaseUrl + "/chat", form);
  }
  chatInit() {
    return this.http.get(this.chatBotBaseUrl + "/init");
  }
  chatBotHistory(obj:any) {
    const formData = new FormData();
    formData.append('bot_id', obj.bot_id);
    formData.append('workspace_id', obj.workspace_id);
    return this.http.post(this.chatBotBaseUrl + "chats/get_all",formData);
  }
  ChatBotWdidget(form: any) {
    const formData = new FormData();
    formData.append('bot_id', form.bot_id);
    formData.append('workspace_id', form.workspace_id);
    formData.append('text', form.text);
    formData.append('session_id', form.session_id);
    return this.http.post(this.chatBotBaseUrl + "chats/batch", formData).pipe(timeout(120 * 1000));
  }
  ChatHistory(form: any) {
    const formData = new FormData();
    formData.append('bot_id', form.bot_id);
    formData.append('workspace_id', form.workspace_id);
    formData.append('session_id', form.session_id);
    return this.http.post(this.chatBotBaseUrl + "chats/get", formData);
  }

  chatBotHistoryForChatHistoryModule() {
    return this.http.get(this.chatBotBaseUrl + "/historylogs");
  }

  chatBotHistoryForHumanInteraction() {
    return this.http.get(this.chatBotBaseUrl + "/escalatecount");
  }
}
