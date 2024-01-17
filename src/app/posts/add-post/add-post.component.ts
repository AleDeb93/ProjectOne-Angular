import { Component } from '@angular/core';
import { PostsApiService } from '../posts-api.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  newPost: any = {
    user_id: "",
    title: "",
    body: "",
  }

  constructor(private apiPosts: PostsApiService, private dialog: MatSnackBar) { }

  async submit(postForm: NgForm) {
    this.apiPosts.createUserPost(this.newPost.user_id, this.newPost).subscribe(() => {
      this.dialog.open(`Post creato con successo!`, '', {
        duration: 1000
      });
      postForm.resetForm();
    }, (error) => {
      this.dialog.open(`Errori nelle richieste!`, '', {
        duration: 1000
      });
      console.error(error)
    }
    )
  }
}
