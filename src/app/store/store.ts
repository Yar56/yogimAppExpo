import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { articleModel } from '@/entities/article';
import { courseModel } from '@/entities/course';
import { lessonModel } from '@/entities/lesson';
import { meditationModel } from '@/entities/meditation';
import { userModel } from '@/entities/user';

const { articleReducer } = articleModel;
const { courseReducer } = courseModel;
const { lessonReducer } = lessonModel;
const { meditationReducer } = meditationModel;
const { userReducer } = userModel;

export const store = configureStore({
    reducer: {
        userState: userReducer,
        articleState: articleReducer,
        courseState: courseReducer,
        lessonState: lessonReducer,
        meditationState: meditationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

declare global {
    type RootState = ReturnType<typeof store.getState>;
    type AppDispatch = typeof store.dispatch;
    type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
}
