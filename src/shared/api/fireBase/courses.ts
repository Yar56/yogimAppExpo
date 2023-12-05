import { collection, getDocs, QuerySnapshot } from '@firebase/firestore';

import { FIREBASE_DB } from '../../lib/baas/firebase';

export const transformSnapshotCollection = <T>(snapshot: QuerySnapshot): T[] => {
    const data: T[] = [];
    snapshot.forEach((doc) => {
        data.push(doc.data() as T);
    });

    return data;
};

export const getAllCourses = () => {
    return getDocs(collection(FIREBASE_DB, 'courses'));
};
