import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { supaBaseApi } from '../../../shared/api/';

export const fetchAllLessonsByCourseId = createAsyncThunk(
    'lesson/fetchAllLessonsByCourseId',
    async (courseId: string) => {
        try {
            const { data } = await supaBaseApi.lessons.getAllLessonsByCourseId(courseId);
            console.log(data);
            return data;
        } catch (e) {
            console.error(e);
        }
    }
);

interface LessonModelState {
    lessonsByCourseId?: supaBaseApi.models.LessonList | null;
    lessonsLoadingStatus: supaBaseApi.models.LoadingStatus;
}
const initialState: LessonModelState = {
    lessonsLoadingStatus: supaBaseApi.models.LoadingStatus.IDLE,
};
export const lessonModel = createSlice({
    name: 'lesson',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllLessonsByCourseId.fulfilled, (state, action) => {
            state.lessonsLoadingStatus = supaBaseApi.models.LoadingStatus.SUCCEEDED;
            state.lessonsByCourseId = action.payload;
        });
        builder.addCase(fetchAllLessonsByCourseId.pending, (state) => {
            state.lessonsLoadingStatus = supaBaseApi.models.LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllLessonsByCourseId.rejected, (state) => {
            state.lessonsLoadingStatus = supaBaseApi.models.LoadingStatus.FAILED;
        });
    },
});

export const {} = lessonModel.actions;

export const lessonReducer = lessonModel.reducer;
