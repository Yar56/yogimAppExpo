import {
    AuthError,
    AuthResponse,
    AuthTokenResponse,
    Session,
    UserAttributes,
    UserResponse,
} from '@supabase/supabase-js';
import { Alert } from 'react-native';

import { SignInUserParams, SignUpUserParams } from './models';
import { UpdateProfileDBParams, ISession } from '@/shared/api/supaBase';
import { supabase } from '@/shared/lib/baas';

export const signUpUser = ({ email, password, username }: SignUpUserParams): Promise<AuthResponse> => {
    return supabase.auth.signUp({ email, password, options: { data: { username } } });
};

export const signInUser = ({ email, password }: SignInUserParams): Promise<AuthTokenResponse> => {
    return supabase.auth.signInWithPassword({ email, password });
};

export const signOutUser = (): Promise<{ error: AuthError | null }> => {
    return supabase.auth.signOut();
};

export const updateUser = (data: UserAttributes): Promise<UserResponse> => {
    return supabase.auth.updateUser(data);
};

export const getProfileDB = (session: ISession) => {
    return supabase.from('profiles').select(`*`).eq('id', session?.user.id).single();
};
export const updateProfileDB = async (session: Session, updates: UpdateProfileDBParams) => {
    if (!session?.user) {
        throw new Error('No user on the session!');
    }
    try {
        const { error } = await supabase.from('profiles').upsert(updates);
        if (error) {
            throw error;
        }
    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message);
        }
    }
};
