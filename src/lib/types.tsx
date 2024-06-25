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
    organizations: string[];
};

export interface AppUserState {
    user: AppUser | null;
    isLoggedIn: boolean;
    login: (user: AppUser) => void;
    logout: () => void;
    setLoggedInFromToken: () => void;
};

export interface Notification {
    notification_id: number;
    notification_timestamp: string;
    notification_message: string;
    notification_image: string;
};