import { supabase } from '../../lib/baas/supabase';

export const getAllMeditations = () => {
    return supabase.from('meditations').select('*');
};
