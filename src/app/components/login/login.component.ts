import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  token: string = '';
  logOn = false;

  constructor(private apiService: ApiService, private route: Router, private http: HttpClient, private dialog: MatSnackBar) { }

  ngOnInit(): void {
    if (this.apiService.token !== '') {
      this.logOn = true
    }
  }

  async login(): Promise<void> {
    if (this.token !== '') {
      this.apiService.token = this.token
      await this.apiService.getList(0, 1, 1).subscribe(() => {
        this.dialog.open('Accesso effettuato', '', {
          duration: 1000
        });
        this.route.navigate(['']);
        this.logOn = true;
      }, (error) => {
        this.token = '';
        this.apiService.token = this.token;
        this.dialog.open('Token non valido', '', {
          duration: 1000
        });
        console.error(error)
        this.logOn = false
      })
    } else if (this.token === undefined) {
      this.token = ''
    } else {
      this.dialog.open('Token non inserito', '', {
        duration: 1000
      });
    }
  }

  logout(): void {
    this.apiService.token = '';
    this.dialog.open('Disconnessione effettuata', '', {
      duration: 1000
    });
    this.logOn = false
    localStorage.setItem('logOn', JSON.stringify(this.logOn))
  }

}
