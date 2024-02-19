import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { supaBaseApi } from '../../../shared/api/';
import { CourseType } from '../../../shared/api/supaBase/models';

export const fetchAllCourses = createAsyncThunk('course/fetchAllCourses', async (arg, { dispatch, getState }) => {
    try {
        const { data } = await supaBaseApi.courses.getAllCourses();
        return data;
    } catch (e) {
        console.error(e);
    }
});

// export const updateCourse = createAsyncThunk(
//     'user/updateUserThunk',
//     async (userData: fireBaseApi.models.UpdateUserParams, thunkAPI) => {
//         try {
//             await fireBaseApi.user.updateUser(userData);
//             return userData;
//         } catch (e) {
//             console.error(e);
//         }
//     }
// );

type CourseList = supaBaseApi.models.CourseList;
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
            state.courses = action.payload;
            state.coursesByType = action?.payload?.reduce(
                (acc) => {
                    // @ts-ignore
                    acc.RECOVERY = action.payload?.filter((item) => item.type === CourseType.RECOVERY);
                    // @ts-ignore
                    acc.YOGA = action.payload?.filter((item) => item.type === CourseType.YOGA);
                    // @ts-ignore
                    acc.MEDITATION = action.payload?.filter((item) => item.type === CourseType.MEDITATION);
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

export const {} = courseModel.actions;

export const courseReducer = courseModel.reducer;
