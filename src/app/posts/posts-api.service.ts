import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {
  private url = 'https://gorest.co.in/public/v2/users/'

  constructor(private apiService: ApiService, private http: HttpClient) { }

  // Funzione per creare un post e assegnarlo ad un utente tramite ID (uso in: add-post)
  createUserPost(userID: string, post: any): Observable<any> {
    const url = `${this.url}${userID}/posts`;
    const headers = this.apiService.getHeaders();
    return this.http.post<any>(url, post, { headers }).pipe(
      catchError(this.apiService.errorHandling)
    )
  }
}
