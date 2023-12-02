import { collection, FirestoreDataConverter, getDocs, QueryDocumentSnapshot, QuerySnapshot } from '@firebase/firestore';
import { FirebaseFirestore } from '@firebase/firestore-types';

import { FIREBASE_DB } from '../../lib/baas/firebase';

// const converter = <T>(): FirestoreDataConverter<T> => ({
//     toFirestore: (data: FirebaseFirestore.WithFieldValue<T>): FirebaseFirestore.DocumentData =>
//         data as FirebaseFirestore.DocumentData,
//     fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => snap.data() as T,
// });
//
// // helpers
// const collection = <T>(collectionPath: string) => firestore.collection(collectionPath).withConverter(converter<T>());
// const doc = <T>(docPath: string) => firestore.doc(docPath).withConverter(converter<T>());
//
// // new entries here
// export const db = {
//     users: collection<User>('users'),
//     user: (id: string) => doc<User>(`users/${id}`),
// };
export const transformSnapshotCollection = <T>(snapshot: QuerySnapshot): T[] => {
    const data: T[] = [];
    snapshot.forEach((doc) => {
        // console.log(typeof doc.data(), 'doc.data()');
        // console.log(doc.data(), 'doc.data()');
        // const data = doc.data();
        // const parsed = JSON.stringify(data);
        // console.log(parsed, 'parsed');
        data.push(doc.data() as T);
    });
    // console.log(JSON.parse(data[0]), 'transformSnapshotCollection');
    return data;
};

export const getAllCourses = () => {
    return getDocs(collection(FIREBASE_DB, 'courses'));
};
