import {API} from '../api';
import useAuthStore from './authStore';

export const signIn = async params => {
  try {
    const obj = {
      username: params.username,
      password: params.password,
    };
    console.log('authApiService: obj', obj);
    const response = await API.post('auth/login', obj);
    console.log('response authApiServices: ', response);
    const user = await response.data;
    console.log('authApiServices user: ', user);
    useAuthStore.getState().updatedUserData(user.data);
  } catch (error) {
    console.log('Error During Login In authApiService: ', error);
  }
};
