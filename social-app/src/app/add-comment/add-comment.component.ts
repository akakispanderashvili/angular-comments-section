import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentsService } from '../comments.service';
import { User } from '../types/user.interface';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
})
export class AddCommentComponent {
  @Input() currentUser!: User;
  @Output() addCommentClicked = new EventEmitter<{
    currentUser: User;
    comment: string;
  }>();
  comment: any;
  comments: string[] = [];
  constructor(private commentsService: CommentsService) {}

  onAddCommentClick() {
    const comment = (document.querySelector('textarea') as HTMLTextAreaElement)
      .value;
    this.addCommentClicked.emit({ currentUser: this.currentUser, comment });
  }
}
