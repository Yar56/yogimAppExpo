import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, AuthTokenResponse, Session, UserAttributes } from '@supabase/supabase-js';

import { supaBaseApi } from '../../shared/api';
import { LoadingStatus } from '../../shared/api/supaBase/models';

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

export const updateUserThunk = createAsyncThunk('user/updateUserThunk', async (userData: UserAttributes, thunkAPI) => {
    try {
        await supaBaseApi.user.updateUser(userData);
        return userData;
    } catch (e) {
        console.error(e);
    }
});

export const fetchProfileDB = createAsyncThunk(
    'course/fetchProfileDB',
    async (session: Session, { dispatch, getState }) => {
        try {
            const { data } = await supaBaseApi.user.getProfileDB(session);
            return data;
        } catch (e) {
            console.error(e);
        }
    }
);

interface UserModelState {
    user: supaBaseApi.models.IUser | null;
    session: supaBaseApi.models.ISession | null;
    profile?: supaBaseApi.models.Profile | null;
    profileLoadingStatus: LoadingStatus;
}
const initialState: UserModelState = { user: null, session: null, profileLoadingStatus: LoadingStatus.IDLE };
export const userModel = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<supaBaseApi.models.IUser | null>) => {
            state.user = payload;
        },
        setSession: (state, { payload }: PayloadAction<supaBaseApi.models.ISession | null>) => {
            state.session = payload;
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
        builder.addCase(fetchProfileDB.fulfilled, (state, { payload }) => {
            state.profile = payload;
            state.profileLoadingStatus = LoadingStatus.IDLE;
        });
        builder.addCase(fetchProfileDB.pending, (state) => {
            state.profileLoadingStatus = LoadingStatus.LOADING;
        });
        builder.addCase(fetchProfileDB.rejected, (state) => {
            state.profileLoadingStatus = LoadingStatus.FAILED;
            state.profile = null;
        });
    },
});

export const { setUser, setSession } = userModel.actions;

export const userReducer = userModel.reducer;
