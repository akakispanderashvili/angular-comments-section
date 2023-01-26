import { CommentModel } from './comment.interface';
import { User } from './user.interface';

export interface DataResponse {
  comments: CommentModel[];
  currentUser: User;
}
