import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login as apiLogin, logout as apiLogout, getAuthToken } from '@/utils/api';
import { useUserStore } from './userStore';

export function useAuth() {
    const router = useRouter();
    const { user, isLoggedIn, login: storeLogin, logout: storeLogout, setLoggedInFromToken } = useUserStore();

    useEffect(() => {
        const rehydrateAuth = () => {
            const token = getAuthToken();
            if (token && !isLoggedIn) {
                setLoggedInFromToken();
            }
        };

        rehydrateAuth();
    }, [isLoggedIn, setLoggedInFromToken]);

    const login = async (email: string, password: string) => {
        try {
            const response = await apiLogin(email, password);
            if (response.success && response.data) {
                storeLogin(response.data.user);
                router.push('/dashboard');
            } else {
                console.error('login error in useAuth:', response.error);
                throw new Error(response.error || 'Login failed');
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        apiLogout();
        storeLogout();
        router.push('/login');
    };

    return {
        user,
        isLoggedIn,
        login,
        logout,
    };
}