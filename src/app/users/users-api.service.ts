import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private url = 'https://gorest.co.in/public/v2/users/'

  constructor(private apiService: ApiService, private http: HttpClient) { }

  // Funzione per eliminare un utente (uso in: users)
  deleteUser(id: number): Observable<any> {
    const url = `${this.url}${id}`;
    const headers = this.apiService.getHeaders();
    return this.http.delete<any>(url, { headers }).pipe(
      catchError(this.apiService.errorHandling)
    )
  }

  // Funzione per creare utenti (uso in: add-users)
  createUser(user: any): Observable<any> {
    const headers = this.apiService.getHeaders();
    return this.http.post<any>(this.url, user, { headers }).pipe(
      catchError(this.apiService.errorHandling)
    )
  }

  // Funzione per visualizzare i dettagli di un singolo utente (uso in: single-users)
  getUserDetails(id: string): Observable<any> {
    const url = `${this.url}${id}`;
    const headers = this.apiService.getHeaders();
    return this.http.get<any>(url, { headers }).pipe(
      catchError(this.apiService.errorHandling)
    )
  }
}
