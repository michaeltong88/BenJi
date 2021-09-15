import {User} from './User.type';

export type UserResponse = {
  hasMore: boolean;
  users: User[];
};
