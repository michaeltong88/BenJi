import axios from 'axios';

import {UserResponse} from 'types/UserResponse.type';
import {User} from 'types/User.type';

export const getUsers = async (): Promise<UserResponse> => {
  const response = await axios.get('/user');
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await axios.put(`/user/${user._id}`, user);
  return response.data;
};
