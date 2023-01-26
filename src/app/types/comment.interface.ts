import { User } from './user.interface';

export interface CommentModel {
  id: number;
  content: string;
  createdAt: string;
  score?: number;
  user?: User;
  replies?: CommentModel[];
  replyingTo?: string;
}
