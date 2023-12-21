// import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Session, User } from '@supabase/supabase-js';

export interface SignUpUserParams {
    email: string;
    password: string;
    username?: string;
}
export type SignInUserParams = SignUpUserParams;

export interface UpdateProfileDBParams {
    avatar_url?: string | null | undefined;
    full_name?: string | null | undefined;
    id: string;
    updated_at?: string | null | undefined;
    username?: string | null | undefined;
    website?: string | null | undefined;
}

export interface SetToDBUserParams {
    userData: {
        email: string | null;
        isAnonymous: boolean;
        emailVerified: boolean;
        displayName: string | null;
        uid: string;
    };
    lastLoginTime: Date;
    buyingCoursesId: string[];
}

export type IUser = User;
export type ISession = Session;

export enum LoadingStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
}

export interface Course {
    id: string;
    description: string;
    disabled: boolean;
    lessonNumber: string;
    time: string;
    title: string;
    welcomeVideoUrl?: string;
}
export type CourseList = Course[];
