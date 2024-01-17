import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { supaBaseApi } from '../../../shared/api/';
import { ArticleList, ArticleType } from '../../../shared/api/supaBase/models';

export const fetchAllArticles = createAsyncThunk('article/fetchAllArticles', async (arg, { dispatch, getState }) => {
    try {
        const { data } = await supaBaseApi.articles.getAllArticles();
        return data;
    } catch (e) {
        console.error(e);
    }
});

interface ArticleModelState {
    articles?: supaBaseApi.models.ArticleList | null;
    articleByType?: Record<ArticleType, ArticleList>;
    articlesLoadingStatus: supaBaseApi.models.LoadingStatus;
}
const initialState: ArticleModelState = {
    articlesLoadingStatus: supaBaseApi.models.LoadingStatus.IDLE,
};

export const articleModel = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllArticles.fulfilled, (state, action) => {
            state.articlesLoadingStatus = supaBaseApi.models.LoadingStatus.SUCCEEDED;
            state.articles = action.payload;
            state.articleByType = action?.payload?.reduce(
                (acc) => {
                    // @ts-ignore
                    acc.ENERGY = action.payload?.filter((item) => item.type === ArticleType.ENERGY);
                    // @ts-ignore
                    acc.MEAL = action.payload?.filter((item) => item.type === ArticleType.MEAL);
                    // @ts-ignore
                    acc.YOGA = action.payload?.filter((item) => item.type === ArticleType.YOGA);
                    return acc;
                },
                {} as Record<ArticleType, ArticleList>
            );
        });
        builder.addCase(fetchAllArticles.pending, (state) => {
            state.articlesLoadingStatus = supaBaseApi.models.LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllArticles.rejected, (state) => {
            state.articlesLoadingStatus = supaBaseApi.models.LoadingStatus.FAILED;
        });
    },
});

export const {} = articleModel.actions;

export const articleReducer = articleModel.reducer;
