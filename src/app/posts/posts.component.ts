import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PaginatorService } from '../services/paginator.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  comments: any[] = [];
  title: string = ''
  // Variabili per caricamento ed errori
  loading: boolean = true
  noResults: boolean = false

  constructor(private apiService: ApiService, public paginator: PaginatorService) { }

  async ngOnInit(): Promise<void> {
    await this.getRecords(1);
  }

  // Funzione ripetuta per chiamare le API (posts)
  async getRecords(n: number) {
    this.loading = true
    try {
      const data = await this.apiService.getList(n, this.paginator.postsPage, this.paginator.postsResults).toPromise();
      this.posts = data
      if (this.posts && this.posts.length > 0) {
        const requests = this.posts.map(post =>
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
    }
    catch {
      console.error('Non è stato possibile ottenere i dati richiesti')
      this.loading = false
      this.noResults = true
    }
  }

  // Funzioni per navigare con paginator
  async navigation(n: number) {
    this.paginator.navigation(1, n)
    await this.getRecords(1)
  }
  async results(n: number) {
    this.paginator.results(1, n)
    await this.getRecords(1)
  }

  // Funzione per filtrare i commenti sui post
  getPostComments(postId: string): any[] {
    return this.comments.filter(comment => comment.post_id === postId);
  }

  // Funzione per ricerca post tramite titolo
  async getPost() {
    if (this.title) {
      this.loading = true
      await this.apiService.searchRecord(1, this.title).subscribe((data) => {
        this.posts = data;
        this.loading = false
      })
    }
  }
  // Pulisce il risultato della ricerca e richiama le API per lista post
  async clear() {
    this.title = ''
    await this.getRecords(1);
  }
}
