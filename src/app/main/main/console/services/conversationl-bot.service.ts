import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class ConversationlBotService {
  constructor(private http: HttpClient) { }

  
  createBot(data: any): Observable<any> {
    return this.http.post(baseUrl + "Loan/AddLoan", data)
  }

  getBots(): Observable<any> {
    return this.http.get(baseUrl + "Loan/GetAllLoans")
  }
  getBotById(id: any): Observable<any> {
    return this.http.get(baseUrl + `Loan/GetLoanById/${id}`)
  }
  
  
  updateBot(data: any): Observable<any> {

    return this.http.put(baseUrl + "Loan/UpdateLoan", data)
  }
  deleteBot(id: any): Observable<any> {

    return this.http.delete(baseUrl + `Loan/DeleteLoan/${id}`)
  }
 

  
  

}

