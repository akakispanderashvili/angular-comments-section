import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentsService } from '../comments.service';
import { CommentModel } from '../types/comment.interface';
import { User } from '../types/user.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  @Input() comments: CommentModel[] = [];
  @Input() currentUser: User | null = null;

  @Output() commentEdited = new EventEmitter<{
    id: number;
    comment: CommentModel;
  }>();
  @Output() commentAdded = new EventEmitter<string>();
  @Output() commentReplied = new EventEmitter<{
    comment: string;
    commentingUser: User;
    repliedToCommentId: number;
  }>();
  @Output() commentDeleted = new EventEmitter<number>();
  @Output() scoreIncremented = new EventEmitter<number>();
  @Output() scoreDecremented = new EventEmitter<number>();


  constructor() {}
  ngOnInit() {}

  decrementCommentScore(id: number) {
    this.scoreDecremented.emit(id);
  }
  incrementCommentScore(id: number) {
    this.scoreIncremented.emit(id);
  }
  deleteComment(id: number) {
    this.commentDeleted.emit(id);
  }
  editComment(event: { id: number; comment: CommentModel }) {
    this.commentEdited.emit(event);
  }
  replyComment(
    event: { currentUser: User; comment: string },
    repliedToCommentId: number
  ) {
    this.commentReplied.emit({
      repliedToCommentId: repliedToCommentId,
      commentingUser: event.currentUser,
      comment: event.comment,
    });
  }
}
