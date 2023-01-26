import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentsService } from './comments.service';
import { CommentModel } from './types/comment.interface';
import { User } from './types/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'social-app';

  comments$: Observable<CommentModel[]>;
  currentUser$ = new Observable<User | null>();

  constructor(public commentsService: CommentsService) {
    this.comments$ = this.commentsService.getComments();
    this.currentUser$ = this.commentsService.getCurrentUser();
  }

  ngOnInit(): void {
    this.commentsService.fetchComments();
  }

  onAddComment(event: { currentUser: User; comment: string }) {
    const comment = this._createCommentObject(event.comment, event.currentUser);
    this.commentsService.addComment(comment);
  }
  onReplyComment(event: {
    commentingUser: User;
    comment: string;
    repliedToCommentId: number;
  }) {
    const comment = this._createCommentObject(
      event.comment,
      event.commentingUser
    );
    this.commentsService.addReply(event.repliedToCommentId, comment);
  }
  onEditComment(event: { id: number; comment: CommentModel }) {
    this.commentsService.editComment(event.id, event.comment);
  }
  onDeleteComment(id: number) {
    this.commentsService.deleteComment(id);
  }
  onAddReply(id: number, reply: CommentModel) {
    this.commentsService.addReply(id, reply);
  }
  onInscrementScore(id: number) {
    this.commentsService.incrementScore(id);
  }
  onDecrementScore(id: number) {
    this.commentsService.decrementScore(id);
  }

  private _createCommentObject(comment: string, user: User): CommentModel {
    return {
      id: Math.floor(Math.random() * 1000),
      content: comment,
      user: user,
      createdAt: '1 Sec ago',
    };
  }
}
