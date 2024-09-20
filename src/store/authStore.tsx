import {create} from 'zustand';
import {devtools, persist, createJSONStorage} from 'zustand/middleware';

const authStore = set => ({
  userData: {
    fullname: '',
  },
  updatedUserData: user => {
    set(state => ({
      userData: {...user},
    }));
  },
  logout: () => {
    set(state => ({
      userData: {},
    }));
  },
});

const useAuthStore = create(
  devtools(
    persist(authStore, {
      name: 'userData',
    }),
  ),
);

export default useAuthStore;
