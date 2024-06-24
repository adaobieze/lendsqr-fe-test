export interface LoginFormData {
    email: string;
    password: string;
    name: string;
};

export interface AppUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
};

export interface AppUserState {
    user: AppUser | null;
    isLoggedIn: boolean;
    login: (user: AppUser) => void;
    logout: () => void;
    setLoggedInFromToken: () => void;
};
