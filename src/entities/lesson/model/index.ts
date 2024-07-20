import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { lessons, LessonList, LoadingStatus } from '@/shared/api/supaBase';

export const fetchAllLessonsByCourseId = createAsyncThunk(
    'lesson/fetchAllLessonsByCourseId',
    async (courseId: string) => {
        try {
            const { data } = await lessons.getAllLessonsByCourseId(courseId);
            return data;
        } catch (e) {
            console.error(e);
        }
    }
);

interface LessonModelState {
    lessonsByCourseId?: LessonList | null;
    lessonsLoadingStatus: LoadingStatus;
}
const initialState: LessonModelState = {
    lessonsLoadingStatus: LoadingStatus.IDLE,
};
export const lessonModel = createSlice({
    name: 'lesson',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllLessonsByCourseId.fulfilled, (state, action) => {
            state.lessonsLoadingStatus = LoadingStatus.SUCCEEDED;
            state.lessonsByCourseId = action.payload;
        });
        builder.addCase(fetchAllLessonsByCourseId.pending, (state) => {
            state.lessonsLoadingStatus = LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllLessonsByCourseId.rejected, (state) => {
            state.lessonsLoadingStatus = LoadingStatus.FAILED;
        });
    },
});

export const lessonReducer = lessonModel.reducer;
