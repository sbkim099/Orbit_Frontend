import { create } from 'zustand';
import useUserStore from './userStore';
import useNotificationStore from './useNotificationStore';

const useAuthStore = create(set => ({
    token: sessionStorage.getItem("token") || null,
    login: (response) => {
        sessionStorage.setItem("token", response.token);
        set({ token: response.token });
    },
    logout: () => {
        sessionStorage.removeItem("token");

        useUserStore.getState().clearUser();
        useNotificationStore.getState().clearNotifications();
        
        set({ token: null });
    }
}));
export default useAuthStore;