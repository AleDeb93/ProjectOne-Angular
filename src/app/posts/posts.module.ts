import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { MaterialModule } from '../modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../modules/shared/shared.module';
import { AddPostComponent } from './add-post/add-post.component';

@NgModule({
  declarations: [
    PostsComponent,
    AddPostComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,

  ]
})
export class PostsModule { }
