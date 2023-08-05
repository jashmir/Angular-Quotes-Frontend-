import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Quote } from './quote';
import { tap } from 'rxjs/operators';
import { AccountServiceService } from './account-service.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteServiceService {

  private baseUrl = 'https://localhost:44358/api/Quotes';

  constructor(private http: HttpClient, private accountService: AccountServiceService) { }

  getQuotesList(): Observable<Quote[]> {
    this.accountService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accountService.getToken()}`
    });
    return this.http.get<Quote[]>(`${this.baseUrl}`, { headers });
  }

  getQuoteById(id: number): Observable<Quote> {
    debugger;
    console.log("id:", id)
    this.accountService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accountService.getToken()}`
    });
    return this.http.get<Quote>(`${this.baseUrl}/${id}`, {headers});
  }

  createQuote(quote: Omit<Quote, 'quoteID'>): Observable<Quote> {
    this.accountService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accountService.getToken()}`
    });
    return this.http.post<Quote>(`${this.baseUrl}`, quote, {headers});
  }

  updateQuote(id: number, value: any): Observable<Quote> {
    this.accountService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accountService.getToken()}`
    });
    return this.http.put<Quote>(`${this.baseUrl}/${id}`, value, {headers});
  }

  deleteQuote(id: number): Observable<any> {
    this.accountService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accountService.getToken()}`
    });
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text', headers });
  }

  private messageSource = new BehaviorSubject<string>('service');
  currentMessage = this.messageSource.asObservable();
}