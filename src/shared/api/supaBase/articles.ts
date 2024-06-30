import { supabase } from '../../lib/baas/supabase';
const uuid = require('@supabase/gotrue-js/src/lib/helpers');

export const getAllArticles = () => {
    return supabase.from('articles').select('*');
};

export const getAllArticlesByIds = (ids: string[]) => {
    return supabase.from('articles').select('*').in('id', ids);
};

export const getAllLikedArticles = ({ profileId }: { profileId: string }) => {
    return supabase.from('likedArticles').select('*').eq('profileId', profileId);
};

export const setLikedArticle = ({ profileId, articleId }: { profileId: string; articleId: string }) => {
    return supabase
        .from('likedArticles')
        .insert([{ id: uuid(), articleId, profileId }])
        .select();
};
export const deleteLikedArticle = ({ articleId, profileId }: { articleId: string; profileId: string }) => {
    return supabase.from('likedArticles').delete().eq('profileId', profileId).eq('articleId', articleId);
};
