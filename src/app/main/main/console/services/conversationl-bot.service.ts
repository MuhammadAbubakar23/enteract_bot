import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.conversationBotBaseUrl;
@Injectable({
  providedIn: 'root'
})
export class ConversationlBotService {
  constructor(private http: HttpClient) { }

  
  createBot(data: any): Observable<any> {
    debugger
    return this.http.post(baseUrl + "workspaces/create", data)
  }

  getBots(): Observable<any> {
    debugger
    return this.http.get(baseUrl + "workspaces/get?bot_id=1")
  }
  getDocuments(params: any): Observable<any> {
    return this.http.get(baseUrl + "documents/get", { params });
  }
  getBotById(id: any): Observable<any> {
    return this.http.get(baseUrl + `Loan/GetLoanById/${id}`)
  }
  getPrompt(workspace_id:any){
    return this.http.get(baseUrl + `workspaces/get_prompt?bot_id=1&workspace_id=${workspace_id}`)
  }
  updatePrompt(body:any){
    return this.http.post(baseUrl + "workspaces/update_prompt", body)
  }
  updateLimit(body:any){
    return this.http.post(baseUrl + "workspaces/update_limit", body)
  }
  updatevectorDb(body:any){
    return this.http.post(baseUrl + "workspaces/update_vectordb", body)
  }
  updateEmbeddings(body:any){
    return this.http.post(baseUrl + "workspaces/update_embeddings", body)
  }
  updatellm(body:any){
    return this.http.post(baseUrl + "workspaces/update_llm", body)
  }
  getName(workspace_id:any){
    return this.http.get(baseUrl + `workspaces/get_name?bot_id=1&workspace_id=${workspace_id}`)
  }
  updateName(body:any){
    return this.http.post(baseUrl+"workspaces/update_name", body)
  }
  updateBot(data: any): Observable<any> {

    return this.http.put(baseUrl + "Loan/UpdateLoan", data)
  }
  uploadFile(formData: any): Observable<any>{
    return this.http.post(baseUrl+ "documents/upload", formData);
  }
  createDocument(formData: any): Observable<any>{
    return this.http.post(baseUrl+ "documents/create", formData);
  }

  disableDocument(body:any){
    return this.http.post(baseUrl + "documents/disable", body)
  }
  enableDocument(body:any){
    return this.http.post(baseUrl + "documents/enable", body)
  }
  deleteBot(id: any): Observable<any> {

    return this.http.delete(baseUrl + `Loan/DeleteLoan/${id}`)
  }
 

  
  

}

