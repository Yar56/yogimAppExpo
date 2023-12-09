import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, AuthTokenResponse } from '@supabase/supabase-js';

import { fireBaseApi, supaBaseApi } from '../../shared/api';

export const signUpUserThunk = createAsyncThunk(
    'user/signUpUserThunk',
    async (userData: supaBaseApi.models.SignUpUserParams, thunkAPI): Promise<AuthResponse> => {
        try {
            return await supaBaseApi.user.signUpUser(userData);
        } catch (error) {
            throw error;
        }
    }
);

export const signInUserThunk = createAsyncThunk(
    'user/signInUserThunk',
    async (userData: supaBaseApi.models.SignInUserParams, thunkAPI): Promise<AuthTokenResponse> => {
        try {
            return await supaBaseApi.user.signInUser(userData);
        } catch (error) {
            throw error;
        }
    }
);

export const updateUserThunk = createAsyncThunk(
    'user/updateUserThunk',
    async (userData: fireBaseApi.models.UpdateUserParams, thunkAPI) => {
        try {
            await fireBaseApi.user.updateUser(userData);
            return userData;
        } catch (e) {
            console.error(e);
        }
    }
);

// export const setUserToDBThunk = createAsyncThunk('course/setUserToDBThunk', async (user, { dispatch, getState }) => {
//     try {
//         const querySnapshot = await fireBaseApi.user.setToDBUser(user);
//         console.log(querySnapshot, 'setUserToDBThunk');
//         // return transformSnapshotCollection<fireBaseApi.models.Course>(querySnapshot);
//     } catch (e) {
//         console.error(e);
//     }
// });

interface UserModelState {
    user: supaBaseApi.models.IUser | null;
    cachedDisplayName: string | null;
}
const initialState: UserModelState = { user: null, cachedDisplayName: null };
export const userModel = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<supaBaseApi.models.IUser | null>) => {
            state.user = payload;
        },
        setCachedDisplayName: (state, { payload }: PayloadAction<string | null>) => {
            state.cachedDisplayName = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUserThunk.fulfilled, (state, action) => {
            state.user = action.payload.data.user;
        });
        builder.addCase(signInUserThunk.fulfilled, (state, action) => {
            state.user = action.payload.data.user;
        });
        builder.addCase(updateUserThunk.fulfilled, (state, action) => {
            if (state.user && action.payload) {
                // state.user.displayName = action.payload.displayName;
            }
        });
    },
});

export const { setUser, setCachedDisplayName } = userModel.actions;

export const userReducer = userModel.reducer;
