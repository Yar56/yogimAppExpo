import { supabase } from '../../lib/baas/supabase';

export const getAllArticles = () => {
    return supabase.from('articles').select('*');
};
