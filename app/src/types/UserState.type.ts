import {User} from './User.type';

export type UserState = {
  hasMore: boolean;
  isFetching: boolean;
  isUpdating: boolean;
  users: User[];
};
