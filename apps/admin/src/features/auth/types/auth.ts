export interface AuthInfo {
    provider: string;
    token: string;
}

export interface UserProfile {
    email: string;
    name: string;
    nickname: string;
    profile_image: string;
    gender: string;
    birthday: string;
    age: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
    userId: string;
    email: string;
    nickname: string;
}

export interface User {
    id: string;
    email: string;
    nickname: string;
    name: string;
    profileImage?: string;
    image?: string; // nav-user 호환성을 위해 추가
}

export interface AuthState {
    user: User | null;
    tokens: Tokens | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface NaverProfile {
    resultcode: string;
    message: string;
    response: {
        id: string;
        email: string;
        name: string;
        nickname: string;
        profile_image: string;
        gender: string;
        birthday: string;
        age: string;
    };
}
