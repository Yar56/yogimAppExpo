import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { supaBaseApi } from '@/shared/api/';
import { CourseList, CourseType } from '@/shared/api/supaBase/models';

export const fetchAllCourses = createAsyncThunk('course/fetchAllCourses', async (arg, { dispatch, getState }) => {
    try {
        const { data } = await supaBaseApi.courses.getAllCourses();
        return data;
    } catch (e) {
        console.error(e);
    }
});

interface CourseModelState {
    courses?: CourseList | null;
    coursesByType?: Record<CourseType, CourseList>;
    coursesLoadingStatus: supaBaseApi.models.LoadingStatus;
}
const initialState: CourseModelState = {
    coursesLoadingStatus: supaBaseApi.models.LoadingStatus.IDLE,
};
export const courseModel = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
            state.coursesLoadingStatus = supaBaseApi.models.LoadingStatus.SUCCEEDED;
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
            state.coursesLoadingStatus = supaBaseApi.models.LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllCourses.rejected, (state) => {
            state.coursesLoadingStatus = supaBaseApi.models.LoadingStatus.FAILED;
        });
    },
});

export const courseReducer = courseModel.reducer;
