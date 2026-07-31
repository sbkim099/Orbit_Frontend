import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "./websocket";
import useUserStore from "../../store/userStore";
import useAuthStore from "../../store/authStore";


export default function NotificationProvider({ children }) {

    const user = useUserStore(state => state.user);
    const token = useAuthStore(state => state.token);

    useEffect(() => {
        if (!user?.id || !token) {
            disconnectSocket();
            return;
        }

        connectSocket(user.id);

        return () => {
            disconnectSocket();
        };

    }, [user?.id, token]);

    return children;
}