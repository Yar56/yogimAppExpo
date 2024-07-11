import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { meditations, MeditationList, LoadingStatus } from '@/shared/api/supaBase';

export const fetchAllMeditations = createAsyncThunk(
    'meditation/fetchAllMeditations',
    async (arg, { dispatch, getState }) => {
        try {
            const { data } = await meditations.getAllMeditations();
            return data;
        } catch (e) {
            console.error(e);
        }
    }
);

interface MeditationModelState {
    meditations?: MeditationList;
    meditationsLoadingStatus: LoadingStatus;
}
const initialState: MeditationModelState = {
    meditationsLoadingStatus: LoadingStatus.IDLE,
};
export const meditationModel = createSlice({
    name: 'meditation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllMeditations.fulfilled, (state, action) => {
            state.meditationsLoadingStatus = LoadingStatus.SUCCEEDED;
            // @ts-ignore
            state.meditations = action.payload;
        });
        builder.addCase(fetchAllMeditations.pending, (state) => {
            state.meditationsLoadingStatus = LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllMeditations.rejected, (state) => {
            state.meditationsLoadingStatus = LoadingStatus.FAILED;
        });
    },
});

export const meditationReducer = meditationModel.reducer;
