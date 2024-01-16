import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: string = '';
  arguments: string[] = ['users', 'posts', 'comments'];
  private url = 'https://gorest.co.in/public/v2/'

  constructor(private http: HttpClient) { }

  // Headers e gestione degli errori per chiamate alle API
  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.token && this.token.trim() !== '') {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }
  errorHandling(error: any): Observable<any> {
    console.error(error);
    return throwError(error);
  }

  // Chiama lista record utenti o posts in base all'argomento selezionato (uso in: users + posts)
  getList(arg: number, page: number, perPage: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.url}${this.arguments[arg]}`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
    return this.http.get<any>(url, { headers, params }).pipe(
      catchError(this.errorHandling)
    );
  }

  // Funzione per cercare un record dal nome / titolo (uso in: users + posts)
  searchRecord(arg: number, string: string): Observable<any> {
    const urlString = encodeURIComponent(string);
    const isEmail = /\S+@\S+\.\S+/.test(string); // controllo per email
    let url = ''
    if (arg === 0) {
      if (isEmail) {
        url = `${this.url}${this.arguments[arg]}?email=${urlString}`;
      }
      else {
        url = `${this.url}${this.arguments[arg]}?name=${urlString}`;
      }
    } else if (arg === 1) {
      url = `${this.url}${this.arguments[arg]}?title=${urlString}`;
    }
    const headers = this.getHeaders();
    return this.http.get<any>(url, { headers }).pipe(
      catchError(this.errorHandling)
    )
  }

  // Funzione per trovare i record comuni quali post dell'utente e commenti al post (uso in: posts + single-user)
  relatedRecords(arg: number, id: string, relArg: number) {
    const url = `${this.url}${this.arguments[arg]}/${id}/${this.arguments[relArg]}`;
    const headers = this.getHeaders();
    return this.http.get<any>(url, { headers }).pipe(
      catchError(this.errorHandling)
    )
  }
}
