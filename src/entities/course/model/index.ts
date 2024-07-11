import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { courses, CourseType, CourseList, LoadingStatus } from '@/shared/api/supaBase';

export const fetchAllCourses = createAsyncThunk('course/fetchAllCourses', async (arg, { dispatch, getState }) => {
    try {
        const { data } = await courses.getAllCourses();
        return data;
    } catch (e) {
        console.error(e);
    }
});

interface CourseModelState {
    courses?: CourseList | null;
    coursesByType?: Record<CourseType, CourseList>;
    coursesLoadingStatus: LoadingStatus;
}
const initialState: CourseModelState = {
    coursesLoadingStatus: LoadingStatus.IDLE,
};
export const courseModel = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
            state.coursesLoadingStatus = LoadingStatus.SUCCEEDED;
            // @ts-ignore
            state.courses = action.payload;
            // @ts-ignore
            state.coursesByType = action?.payload?.reduce(
                (acc) => {
                    acc.RECOVERY = action.payload?.filter((item) => item.type === CourseType.RECOVERY) ?? [];

                    acc.YOGA = action.payload?.filter((item) => item.type === CourseType.YOGA) ?? [];

                    acc.MEDITATION = action.payload?.filter((item) => item.type === CourseType.MEDITATION) ?? [];
                    return acc;
                },
                {} as Record<CourseType, CourseList>
            );
        });
        builder.addCase(fetchAllCourses.pending, (state) => {
            state.coursesLoadingStatus = LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllCourses.rejected, (state) => {
            state.coursesLoadingStatus = LoadingStatus.FAILED;
        });
    },
});

export const courseReducer = courseModel.reducer;
