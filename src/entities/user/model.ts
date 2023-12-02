import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fireBaseApi } from '../../shared/api';

export const signUpUserThunk = createAsyncThunk(
    'user/signUpUserThunk',
    async (userData: fireBaseApi.models.SignUpUserParams, thunkAPI) => {
        try {
            const response = await fireBaseApi.user.signUpUser(userData);
            return response;
        } catch (error) {
            console.error(error);
            return { user: null, additionalUserInfo: null };
        }
    }
);

export const signInUserThunk = createAsyncThunk(
    'user/signInUserThunk',
    async (userData: fireBaseApi.models.SignInUserParams, thunkAPI) => {
        return await fireBaseApi.user.signInUser(userData);
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

interface UserModelState {
    user: fireBaseApi.models.IUser | null;
    cachedDisplayName: string | null;
}
const initialState: UserModelState = { user: null, cachedDisplayName: null };
export const userModel = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<fireBaseApi.models.IUser | null>) => {
            state.user = payload;
        },
        setCachedDisplayName: (state, { payload }: PayloadAction<string | null>) => {
            state.cachedDisplayName = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUserThunk.fulfilled, (state, action) => {
            state.user = action.payload.user;
        });
        builder.addCase(signInUserThunk.fulfilled, (state, action) => {
            state.user = action.payload.user;
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
