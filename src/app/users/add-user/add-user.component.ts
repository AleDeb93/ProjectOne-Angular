import { Component } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  newUser: any = {
    name: "",
    gender: "",
    email: "",
    status: ""
  };

  constructor(private apiUsers: UsersApiService, private dialog: MatSnackBar) { }

  async submit(userForm: NgForm) {
    this.apiUsers.createUser(this.newUser).subscribe(() => {
      this.dialog.open('Utente creato', '', {
        duration: 1000
      });
      userForm.resetForm();
    }, (error) => {
      console.error(error)
      this.dialog.open(`Errori nell'inserimento dei dati`, '', {
        duration: 1000
      });
    }
    )
  }
}
