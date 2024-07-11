import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

import { dbModels } from '@/shared/api/supaBase';

import { YOUR_REACT_NATIVE_SUPABASE_ANON_KEY, YOUR_REACT_NATIVE_SUPABASE_URL } from '../../constants/env';

const supabaseUrl = YOUR_REACT_NATIVE_SUPABASE_URL;
const supabaseAnonKey = YOUR_REACT_NATIVE_SUPABASE_ANON_KEY;
export const supabase = createClient<dbModels.Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
    db: {},
});
