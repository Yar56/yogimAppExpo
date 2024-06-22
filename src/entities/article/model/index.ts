import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createAppAsyncThunk } from '../../../app/store/hooks';
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

export const fetchAllArticlesByIds = createAsyncThunk(
    'article/fetchAllArticlesByIds',
    async (ids: string[], { dispatch, getState }) => {
        try {
            const { data } = await supaBaseApi.articles.getAllArticlesByIds(ids);
            return data;
        } catch (e) {
            console.error(e);
        }
    }
);

export const fetchAllLikedArticles = createAppAsyncThunk(
    'article/fetchAllLikedArticles',
    async (arg, { dispatch, getState }) => {
        const profileId = getState().userState?.user?.id;

        if (!profileId) {
            throw new Error('profileId is undefined');
        }

        try {
            const { data } = await supaBaseApi.articles.getAllLikedArticles({ profileId });
            return data;
        } catch (e) {
            console.error(e);
        }
    }
);

export const setLikedArticleThunk = createAppAsyncThunk(
    'article/setLikedArticleThunk',
    async ({ articleId }: { articleId?: string }, { dispatch, getState }) => {
        const profileId = getState().userState?.user?.id;

        if (!profileId || !articleId) {
            throw new Error('profileId of articleId are undefined');
        }

        try {
            const { data } = await supaBaseApi.articles.setLikedArticle({ profileId, articleId });
            console.log(data, 'data setLikedArticleThunk');
            return data;
        } catch (e) {
            console.error(e);
        }
    }
);

export const deleteLikedArticleThunk = createAppAsyncThunk(
    'article/deleteLikedArticleThunk',
    async ({ articleId }: { articleId?: string }, { dispatch, getState }) => {
        const profileId = getState().userState?.user?.id;

        if (!profileId || !articleId) {
            throw new Error('articleId is undefined');
        }

        try {
            await supaBaseApi.articles.deleteLikedArticle({ articleId, profileId });
            return articleId;
        } catch (e) {
            console.error(e);
        }
    }
);

interface ArticleModelState {
    articles?: supaBaseApi.models.ArticleList | null;
    likedArticles?: supaBaseApi.models.ArticleList | null;
    likedArticleIds?: string[];
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

        // region fetch all liked articles
        builder.addCase(fetchAllArticlesByIds.fulfilled, (state, action) => {
            state.articlesLoadingStatus = supaBaseApi.models.LoadingStatus.SUCCEEDED;
            state.likedArticles = action.payload;
        });
        builder.addCase(fetchAllArticlesByIds.pending, (state) => {
            state.articlesLoadingStatus = supaBaseApi.models.LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllArticlesByIds.rejected, (state) => {
            state.articlesLoadingStatus = supaBaseApi.models.LoadingStatus.FAILED;
        });
        // endregion

        // region fetch all ids
        builder.addCase(fetchAllLikedArticles.fulfilled, (state, { payload }) => {
            state.likedArticleIds = payload?.map((liked) => liked.articleId);
        });
        builder.addCase(fetchAllLikedArticles.pending, (state) => {
            state.articlesLoadingStatus = supaBaseApi.models.LoadingStatus.LOADING;
        });
        builder.addCase(fetchAllLikedArticles.rejected, (state) => {
            state.articlesLoadingStatus = supaBaseApi.models.LoadingStatus.FAILED;
        });
        // endregion

        // region set,remove liked article
        builder.addCase(setLikedArticleThunk.fulfilled, (state, { payload }) => {
            const newId = payload?.[0].articleId;
            if (newId) {
                state.likedArticleIds?.push(newId);
            }
        });
        builder.addCase(deleteLikedArticleThunk.fulfilled, (state, { payload }) => {
            state.likedArticleIds = state.likedArticleIds?.filter((likedId) => likedId !== payload);
        });
        // endregion
    },
});

export const {} = articleModel.actions;

export const articleReducer = articleModel.reducer;
