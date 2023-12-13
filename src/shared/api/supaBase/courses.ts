import { supabase } from '../../lib/baas/supabase';

export const getAllCourses = () => {
    return supabase.from('courses').select();
};
