import { UserCredential } from '@firebase/auth';
import {
    User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

import { SignInUserParams, SignUpUserParams, UpdateUserParams } from './models';
import { FIREBASE_AUTH } from '../../lib/baas/firebase';

export const signUpUser = ({ email, password }: SignUpUserParams): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
};

export const signInUser = ({ email, password }: SignInUserParams): Promise<UserCredential> => {
    return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
};

export const signOutUser = (): Promise<void> => {
    return signOut(FIREBASE_AUTH);
};

export const updateUser = ({ displayName }: UpdateUserParams): Promise<void> | undefined => {
    // if (!auth()?.currentUser?.updateProfile) {
    //     return Promise.resolve();
    // }
    // return auth().currentUser?.updateProfile({ displayName });
    return Promise.resolve();
};

//onChanged: FirebaseAuthTypes.AuthListenerCallback
export const checkAuthUser = (onChanged: (user: User | null) => void) => {
    onAuthStateChanged(FIREBASE_AUTH, onChanged);
};
