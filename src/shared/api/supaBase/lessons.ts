import { supabase } from '../../lib/baas/supabase';

export const getAllLessonsByCourseId = (courseId: string) => {
    return supabase.from('lessons').select('*').eq('courseId', courseId);
};
