import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommentModel } from './types/comment.interface';
import { DataResponse } from './types/data-response.interface';
import { User } from './types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private _comments = new BehaviorSubject<CommentModel[]>([]);
  private _currentUser = new BehaviorSubject<User>({} as User);

  constructor(private _httpClient: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this._currentUser.asObservable();
  }
  getComments(): Observable<CommentModel[]> {
    return this._comments.asObservable();
  }

  fetchComments() {
    this._httpClient
      .get<DataResponse>('assets/json/data.json')
      .subscribe((response: DataResponse) => {
        this._comments.next(response.comments);
        this._currentUser.next(response.currentUser);
      });
  }

  addComment(comment: CommentModel) {
    const commentsValue = this._comments.value;
    commentsValue.push(comment);
    this._comments.next(commentsValue);
  }

  addReply(id: number, reply: CommentModel) {
    const commentsValue = this._comments.value;
    const comment = commentsValue.find((comment) => comment.id === id);
    if (!comment) return;
    comment.replies?.push(reply);
    this._comments.next(commentsValue);
  }

  incrementScore(id: number) {
    const commentsValue = this._comments.value;
    const comment = commentsValue.find((comment) => comment.id === id);
    if (comment && comment?.score) comment.score++;
    this._comments.next(commentsValue);
  }

  decrementScore(id: number) {
    const commentsValue = this._comments.value;
    const comment = commentsValue.find((comment) => comment.id === id);
    if (comment && comment?.score) comment.score--;
    this._comments.next(commentsValue);
  }

  deleteComment(id: number) {
    const commentsValue = this._comments.value.filter(
      (comments) => comments.id !== id
    );
    this._comments.next(commentsValue);
  }

  editComment(id: number, comment: CommentModel) {
    const commentsValue = this._comments.value;
    const index = commentsValue.findIndex((comment) => comment.id === id);
    commentsValue[index] = comment;
    this._comments.next(commentsValue);
  }
}
