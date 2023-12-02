import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fireBaseApi } from '../../../shared/api/';
import { transformSnapshotCollection } from '../../../shared/api/fireBase/courses';

export const fetchAllCourses = createAsyncThunk('course/fetchAllCourses', async (arg, { dispatch, getState }) => {
    try {
        const querySnapshot = await fireBaseApi.courses.getAllCourses();
        return transformSnapshotCollection<fireBaseApi.models.Course>(querySnapshot);
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

interface CourseModelState {
    courses?: fireBaseApi.models.CourseList;
    coursesLoadingStatus: fireBaseApi.models.LoadingStatus;
}
const initialState: CourseModelState = {
    coursesLoadingStatus: fireBaseApi.models.LoadingStatus.IDLE,
};
export const courseModel = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
            state.coursesLoadingStatus = fireBaseApi.models.LoadingStatus.SUCCEEDED;
            state.courses = action.payload;
        });
        builder.addCase(fetchAllCourses.pending, (state) => {
            state.coursesLoadingStatus = fireBaseApi.models.LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllCourses.rejected, (state) => {
            state.coursesLoadingStatus = fireBaseApi.models.LoadingStatus.FAILED;
        });
    },
});

export const {} = courseModel.actions;

export const courseReducer = courseModel.reducer;
