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
import { supaBaseApi } from '..';
import { supabase } from '../../lib/baas/supabase';

export const signUpUser = ({ email, password, name }: SignUpUserParams): Promise<AuthResponse> => {
    return supabase.auth.signUp({ email, password, options: { data: { name } } });
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

export const getProfileDB = (session: supaBaseApi.models.ISession) => {
    return supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
};
export const updateProfileDB = async (session: Session, updates: supaBaseApi.dbModels.Tables<'profiles'>) => {
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
// export const checkAuthUser = (onChanged: (user: User | null) => void) => {
//     onAuthStateChanged(FIREBASE_AUTH, onChanged);
// };
//
// export const setToDBUser = (user: SetToDBUserParams) => {
//     return setDoc(doc(FIREBASE_DB, 'users', `${user.userData.uid}`), user, { merge: true });
// };
