import {User} from 'types/User.type';
import {UserState} from 'types/UserState.type';
import {EActionTypes} from 'types/ActionTypes.enum';

const initState: UserState = {
  isFetching: false,
  isUpdating: false,
  hasMore: false,
  users: [],
};

const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    case EActionTypes.GET_USERS:
      return {
        ...state,
        isFetching: true,
        users: action.payload.offset === 0 ? [] : state.users,
      };
    case EActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasMore: action.payload.hasMore,
        users: [...state.users, ...action.payload.users],
      };
    case EActionTypes.GET_USERS:
      return {
        ...state,
        isFetching: false,
      };
    case EActionTypes.UPDATE_USER:
      return {
        ...state,
        isUpdating: true,
      };
    case EActionTypes.UPDATE_USER_SUCCESS:
      const index = state.users.findIndex(
        (user: User) => user._id === action.payload._id,
      );

      if (index > -1) {
        state.users[index] = action.payload as User;
      }

      return {
        ...state,
        isUpdating: false,
        users: [...state.users],
      };
    case EActionTypes.UPDATE_USER_FAIL:
      return {
        ...state,
        isUpdating: false,
      };
    default:
      return state;
  }
};

export default userReducer;
