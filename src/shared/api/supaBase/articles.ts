import { uuid } from '@supabase/gotrue-js/src/lib/helpers';

import { supabase } from '../../lib/baas/supabase';

export const getAllArticles = () => {
    return supabase.from('articles').select('*');
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
export const deleteLikedArticle = ({ articleId }: { articleId: string }) => {
    return supabase.from('likedArticles').delete().eq('articleId', articleId);
};
