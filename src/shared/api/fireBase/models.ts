// // import { FirebaseAuthTypes } from '@react-native-firebase/auth';
//
// import { User } from 'firebase/auth';
//
// export interface SignUpUserParams {
//     email: string;
//     password: string;
// }
// export type SignInUserParams = SignUpUserParams;
//
// export interface SetToDBUserParams {
//     userData: {
//         email: string | null;
//         isAnonymous: boolean;
//         emailVerified: boolean;
//         displayName: string | null;
//         uid: string;
//     };
//     lastLoginTime: Date;
//     buyingCoursesId: string[];
// }
//
// export type IUser = User;
//
// export enum LoadingStatus {
//     IDLE = 'idle',
//     LOADING = 'loading',
//     SUCCEEDED = 'succeeded',
//     FAILED = 'failed',
// }
//
// export interface UpdateUserParams {
//     user: IUser;
//     displayName?: string | null;
//     photoURL?: string;
// }
//
// export interface Course {
//     id: string;
//     description: string;
//     disabled: boolean;
//     lessonNumber: string;
//     time: string;
//     title: string;
// }
// export type CourseList = Course[];
//
// // export interface AuthStateChangesResponse {
// //     kind: string;
// //     users: User[];
// // }
// //
// // export type FavoritedCoinsMap = Record<string, Record<string, boolean>>;
// // export type FavoritedCoinsMapResponse = Record<string, boolean>;
// //
// // export interface FirebaseError {
// //     code: number;
// //     message: AuthErrorMessages;
// // }
// //
// // export enum AuthErrorMessages {
// //     // singIn
// //     EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
// //     INVALID_PASSWORD = 'INVALID_PASSWORD',
// //     USER_DISABLED = 'USER_DISABLED',
// //
// //     // signUp
// //     EMAIL_EXISTS = 'EMAIL_EXISTS',
// //     OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
// //     TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER',
// // }
