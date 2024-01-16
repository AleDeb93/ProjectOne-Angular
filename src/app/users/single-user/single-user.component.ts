import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UsersApiService } from '../users-api.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css'
})
export class SingleUserComponent implements OnInit {
  // Variabili per gestione risultati e record
  user: any;
  posts: any[] = [];
  comments: any[] = []
  // Variabile booleane per corretta gestione caricamento ed errori
  loading: boolean = true;

  constructor(private apiService: ApiService, private apiUsers: UsersApiService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      // Prima trovo il record utente relativo all'ID nel path
      await this.apiUsers.getUserDetails(userId).subscribe((user: any) => {
        this.user = user;
      });
      // Poi trovo i post relativi all'utente selezionato tramite ID
      await this.apiService.relatedRecords(0, userId, 1).subscribe((posts) => {
        this.posts = posts
        if (this.posts && this.posts.length > 0) {
          const requests = this.posts.map(post =>
            // Infine trovo tutti i commenti relativi ai post dell'utente
            this.apiService.relatedRecords(1, post.id, 2)
          );
          // forkJoin per eseguire tutte le chiamate requests in parallelo
          forkJoin(requests).subscribe((commentsArray: any[]) => {
            // reduce concatena tutti gli "array di commenti" ottenuti in un unico array comments
            this.comments = commentsArray.reduce((acc: any[], comments: any[]) => acc.concat(comments), []);
            this.loading = false
          });
        } else {
          this.loading = false
        }
      });
    }
  }

  // Filtro i commenti trovati sopra sulla base dell'ID del post
  getPostComments(postId: string): any[] {
    return this.comments.filter(comment => comment.post_id === postId);
  }
}
