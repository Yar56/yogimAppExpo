import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { courseReducer } from '../../entities/course/model';
import { lessonReducer } from '../../entities/lesson/model';
import { userReducer } from '../../entities/user/model';

export const store = configureStore({
    reducer: {
        userState: userReducer,
        courseState: courseReducer,
        lessonState: lessonReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

console.log(store.getState(), 'redux store');

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
