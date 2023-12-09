// import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { User } from '@supabase/supabase-js';

export interface SignUpUserParams {
    email: string;
    password: string;
}
export type SignInUserParams = SignUpUserParams;

export interface UpdateProfileDBParams {
    username: string;
    website: string;
    avatar_url: string;
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
}
export type CourseList = Course[];
