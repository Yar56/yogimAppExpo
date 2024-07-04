import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { supaBaseApi } from '@/shared/api';

export const fetchAllMeditations = createAsyncThunk(
    'meditation/fetchAllMeditations',
    async (arg, { dispatch, getState }) => {
        try {
            const { data } = await supaBaseApi.meditations.getAllMeditations();
            return data;
        } catch (e) {
            console.error(e);
        }
    }
);

type MeditationList = supaBaseApi.models.MeditationList;
interface MeditationModelState {
    meditations?: MeditationList;
    meditationsLoadingStatus: supaBaseApi.models.LoadingStatus;
}
const initialState: MeditationModelState = {
    meditationsLoadingStatus: supaBaseApi.models.LoadingStatus.IDLE,
};
export const meditationModel = createSlice({
    name: 'meditation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllMeditations.fulfilled, (state, action) => {
            state.meditationsLoadingStatus = supaBaseApi.models.LoadingStatus.SUCCEEDED;
            // @ts-ignore
            state.meditations = action.payload;
        });
        builder.addCase(fetchAllMeditations.pending, (state) => {
            state.meditationsLoadingStatus = supaBaseApi.models.LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllMeditations.rejected, (state) => {
            state.meditationsLoadingStatus = supaBaseApi.models.LoadingStatus.FAILED;
        });
    },
});

export const meditationReducer = meditationModel.reducer;
