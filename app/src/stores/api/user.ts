import axios from 'axios';

import {UserResponse} from 'types/UserResponse.type';
import {User} from 'types/User.type';

import {Constants} from 'globals';

export const getUsers = async (offset: number): Promise<UserResponse> => {
  const response = await axios.get(
    `/user?offset=${offset}&limit=${Constants.usersPerPage}`,
  );
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await axios.put(`/user/${user._id}`, user);
  return response.data;
};
