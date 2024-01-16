import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PaginatorService } from '../services/paginator.service';
import { UsersApiService } from './users-api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  text: string = ''
  // Variabili booleane per corretta gestione caricamento ed errori
  loading: boolean = true
  noResults: boolean = false;

  constructor(private apiService: ApiService, public paginator: PaginatorService, private apiUsers: UsersApiService, private dialog: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    await this.getRecords();
  }

  // Funzione ripetuta per chiamare le API (users)
  async getRecords() {
    this.loading = true
    try {
      const data = await this.apiService.getList(0, this.paginator.usersPage, this.paginator.usersResults).toPromise();
      this.users = data
      this.loading = false
    }
    catch {
      console.error('Non è stato possibile ottenere i dati richiesti');
      this.loading = false
    }
  }

  // Funzioni per navigare con paginator
  async navigation(n: number) {
    this.paginator.navigation(0, n)
    await this.getRecords()
  }
  async results(n: number) {
    this.paginator.results(0, n)
    await this.getRecords()
  }

  // Elimina utente
  async deleteUser(id: number) {
    await this.apiUsers.deleteUser(id).subscribe(() => {
      this.dialog.open('Utente eliminato', '', {
        duration: 1000
      });
      this.getRecords();
    })
  }

  // Ricerca utente tramite nome
  async getUser() {
    if (this.text) {
      await this.apiService.searchRecord(0, this.text.trim()).subscribe((data) => {
        this.users = data
        if (this.users.length === 0) {
          this.noResults = true
        }
      })
    }
  }
  // Funzione per pulire il form di ricerca e ripopolare la tabella utenti
  async clear() {
    this.text = '';
    this.noResults = false;
    await this.getRecords();
  }
}
