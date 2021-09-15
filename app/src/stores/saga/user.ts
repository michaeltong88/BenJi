import {put, takeEvery} from 'redux-saga/effects';

import {User} from 'types/User.type';
import {UserResponse} from 'types/UserResponse.type';
import {EActionTypes} from 'types/ActionTypes.enum';
import {getUsers, updateUser} from 'stores/api';

function* getUsersSaga({payload}: {payload: {offset: number}}) {
  try {
    const response: UserResponse = yield getUsers(payload.offset);
    yield put({type: EActionTypes.GET_USERS_SUCCESS, payload: response});
  } catch (error) {
    console.log(error);
    yield put({type: EActionTypes.GET_USERS_FAIL, payload: error.meesage});
  }
}

function* updateUserSaga({payload}: {payload: User}) {
  try {
    const response: User = yield updateUser(payload);
    yield put({type: EActionTypes.UPDATE_USER_SUCCESS, payload: response});
  } catch (error) {
    console.log(error);
    yield put({type: EActionTypes.UPDATE_USER_FAIL, payload: error.meesage});
  }
}

export default function* userSaga() {
  yield takeEvery(EActionTypes.GET_USERS, getUsersSaga);
  yield takeEvery(EActionTypes.UPDATE_USER, updateUserSaga);
}
