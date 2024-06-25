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


export interface UserDashboardMetrics {
    allUsers: number;
    activeUsers: number;
    usersWithLoans: number;
    usersWithSavings: number;
};

export interface User {
    id: string;
    organization: string;
    userName: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    status: string;
};


export interface UserDetails {
    id: string;
    userPhoto: string;
    userTier: number;
    personalInfo: UserPersonalInfo;
    educationAndEmployment: UserEducationAndEmployment;
    socials: UserSocials;
    guarantors: UserGuarantor[];
    bankDetails: UserBankDetails;
}

interface UserPersonalInfo {
    userName: string;
    userRegNo: string;
    phoneNumber: string;
    email: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    typeOfResidence: string;
}

interface UserEducationAndEmployment {
    educationLevel: string;
    employmentStatus: string;
    employmentSector: string;
    employmentDuration: string;
    officeEmail: string;
    monthlyIncomeRange: UserIncomeRange;
    loanRepayment: number;
}

interface UserIncomeRange {
    lowRange: number;
    highRange: number;
}

interface UserSocials {
    twitter: string;
    facebook: string;
    instagram: string;
}

interface UserGuarantor {
    id: number;
    guarantorName: string;
    guarantorPhoneNumber: string;
    email: string;
    relationship: string;
}

interface UserBankDetails {
    id: number;
    bankName: string;
    accountNumber: string;
    balance: number;
}