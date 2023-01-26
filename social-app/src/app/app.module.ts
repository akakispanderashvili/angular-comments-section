import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommentsService } from './comments.service';

import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { PopupComponent } from './popup/popup.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    CommentComponent,
    AddCommentComponent,
    PopupComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
