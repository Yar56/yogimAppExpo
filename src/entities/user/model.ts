import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, AuthTokenResponse, Session, UserAttributes } from '@supabase/supabase-js';

import {
    LoadingStatus,
    SignUpUserParams,
    SignInUserParams,
    user,
    IUser,
    ISession,
    Profile,
} from '@/shared/api/supaBase';

export const signUpUserThunk = createAsyncThunk(
    'user/signUpUserThunk',
    async (userData: SignUpUserParams, thunkAPI): Promise<AuthResponse> => {
        return await user.signUpUser(userData);
    }
);

export const signInUserThunk = createAsyncThunk(
    'user/signInUserThunk',
    async (userData: SignInUserParams, thunkAPI): Promise<AuthTokenResponse> => {
        return await user.signInUser(userData);
    }
);

export const updateUserThunk = createAsyncThunk('user/updateUserThunk', async (userData: UserAttributes, thunkAPI) => {
    try {
        await user.updateUser(userData);
        return userData;
    } catch (e) {
        console.error(e);
    }
});

export const fetchProfileDB = createAsyncThunk(
    'course/fetchProfileDB',
    async (session: Session, { dispatch, getState }) => {
        try {
            const { data } = await user.getProfileDB(session);
            return data;
        } catch (e) {
            console.error(e);
        }
    }
);

interface UserModelState {
    user: IUser | null;
    session: ISession | null;
    profile?: Profile | null;
    profileLoadingStatus: LoadingStatus;
}
const initialState: UserModelState = { user: null, session: null, profileLoadingStatus: LoadingStatus.IDLE };
export const userModel = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<IUser | null>) => {
            state.user = payload;
        },
        setSession: (state, { payload }: PayloadAction<ISession | null>) => {
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
