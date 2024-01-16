import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  // Variabili per paginator utenti
  usersPage: number = 1;
  usersResults: number = 10;

  // Variabili per paginator posts
  postsPage: number = 1;
  postsResults: number = 10;

  constructor() { }

  // Funzione per navigare tra le pagina users o posts
  navigation(arg: number, n: number) {
    if (arg === 0) {
      switch (n) {
        case 0:
          if (this.usersPage > 1) {
            this.usersPage--;
          }
          break;
        case 1:
          this.usersPage++;
          break;
        default:
          this.usersPage = 1;
          break;
      }
    } else if (arg === 1) {
      switch (n) {
        case 0:
          if (this.postsPage > 1) {
            this.postsPage--;
          }
          break;
        case 1:
          this.postsPage++;
          break;
        default:
          this.postsPage = 1;
          break;
      }
    }
  }

  // Funzione per visualizzare un numero di risultati a scelta
  results(arg: number, n: number) {
    if (arg === 0) {
      this.usersResults = n
    } else if (arg === 1) {
      this.postsResults = n
    }
  }
}
