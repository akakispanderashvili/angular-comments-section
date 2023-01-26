import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommentModel } from '../types/comment.interface';
import { User } from '../types/user.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent {
  @Input() comment!: CommentModel;
  @Input() currentUser!: User | null;

  @Output() commentEdited = new EventEmitter<{
    id: number;
    comment: CommentModel;
  }>();
  @Output() commentDeleted = new EventEmitter<number>();
  @Output() commentReplied = new EventEmitter<{
    currentUser: User;
    comment: string;
  }>();
  @Output() scoreIncremented = new EventEmitter<number>();
  @Output() scoreDecremented = new EventEmitter<number>();

  isReplying!: Action;
  isEditing!: Action;
  isDeleting!: Action;

  decrementScore(id: number) {
    this.scoreDecremented.emit(id);
  }
  incrementScore(id: number) {
    this.scoreIncremented.emit(id);
  }
  edit(id: number, comment: CommentModel) {
    this.commentEdited.emit({ id, comment });
  }
  onDeleteClick(id: number) {
    this.isDeleting = { id, isActive: true };
  }
  onCancelDelete() {
    this.isDeleting = { id: 0, isActive: false };
  }
  onConfirmDelete() {
    this.commentDeleted.emit(this.comment.id);
  }
  onEditClick(id: number) {
    this.isEditing = { id, isActive: true };
  }
  onReplyClick(id: number) {
    this.isReplying = { id, isActive: true };
  }
  onCommentReply(event: { currentUser: User; comment: string }) {
    this.commentReplied.emit(event);
  }
}

export interface Action {
  id: number;
  isActive: boolean;
}
