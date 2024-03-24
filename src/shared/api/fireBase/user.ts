// import { UserCredential } from '@firebase/auth';
// import { doc, setDoc } from '@firebase/firestore';
// import {
//     createUserWithEmailAndPassword,
//     onAuthStateChanged,
//     signInWithEmailAndPassword,
//     signOut,
//     updateProfile,
//     User,
// } from 'firebase/auth';
//
// import { SetToDBUserParams, SignInUserParams, SignUpUserParams, UpdateUserParams } from './models';
// import { FIREBASE_AUTH, FIREBASE_DB } from '../../lib/baas/firebase';
//
// export const signUpUser = ({ email, password }: SignUpUserParams): Promise<UserCredential> => {
//     return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
// };
//
// export const signInUser = ({ email, password }: SignInUserParams): Promise<UserCredential> => {
//     return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
// };
//
// export const signOutUser = (): Promise<void> => {
//     return signOut(FIREBASE_AUTH);
// };
//
// export const updateUser = ({ user, displayName }: UpdateUserParams): Promise<void> => {
//     return updateProfile(user, { displayName });
// };
//
// export const checkAuthUser = (onChanged: (user: User | null) => void) => {
//     onAuthStateChanged(FIREBASE_AUTH, onChanged);
// };
//
// export const setToDBUser = (user: SetToDBUserParams) => {
//     return setDoc(doc(FIREBASE_DB, 'users', `${user.userData.uid}`), user, { merge: true });
// };
