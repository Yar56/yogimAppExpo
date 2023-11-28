// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { SignInUserParams, SignUpUserParams, UpdateUserParams } from './models';

//Promise<FirebaseAuthTypes.UserCredential>
export const signUpUser = ({ email, password }: SignUpUserParams): Promise<void> => {
    // return auth().createUserWithEmailAndPassword(email, password);
    return Promise.resolve();
};

//Promise<FirebaseAuthTypes.UserCredential>
export const signInUser = ({ email, password }: SignInUserParams): Promise<void> => {
    // return auth().signInWithEmailAndPassword(email, password);
    return Promise.resolve();
};

export const signOutUser = (): Promise<void> => {
    return Promise.resolve();
    // auth().signOut();
};

export const updateUser = ({ displayName }: UpdateUserParams): Promise<void> | undefined => {
    // if (!auth()?.currentUser?.updateProfile) {
    //     return Promise.resolve();
    // }
    // return auth().currentUser?.updateProfile({ displayName });
    return Promise.resolve();
};

//onChanged: FirebaseAuthTypes.AuthListenerCallback
export const checkAuthUser = (onChanged: void) => {
    return Promise.resolve();
    // auth().onAuthStateChanged(onChanged);
};
