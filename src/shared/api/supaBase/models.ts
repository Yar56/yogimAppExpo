// import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Session, User } from '@supabase/supabase-js';

import { Database, Tables } from './dbModels';

export interface SignUpUserParams {
    email: string;
    password: string;
    username?: string;
}
export type SignInUserParams = SignUpUserParams;

export type UpdateProfileDBParams = Database['public']['Tables']['profiles']['Update'];

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

export type Course = Database['public']['Tables']['courses']['Row'];
export type CourseList = Tables<'courses'>[];
export type LessonList = Tables<'lessons'>[];
export type ArticleList = Tables<'articles'>[];
export type Article = Database['public']['Tables']['articles']['Row'];
export type Profile = Tables<'profiles'>;

export enum ArticleType {
    ENERGY = 'ENERGY',
    YOGA = 'YOGA',
    MEAL = 'MEAL',
}
