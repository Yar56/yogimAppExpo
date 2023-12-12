import { Session } from '@supabase/supabase-js';
import * as SplashScreen from 'expo-splash-screen';
import { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';

import { userModel } from '../../entities/user';
import { supabase } from '../../shared/lib/baas/supabase';
import { useAppDispatch } from '../store/hooks';

SplashScreen.preventAutoHideAsync();

export const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);

    const dispatch = useAppDispatch();
    const [initializing, setInitializing] = useState(false);
    // const userDisplayName = useAppSelector((state) => state.userState.user?.displayName);
    // const cachedDisplayName = useAppSelector((state) => state.userState.cachedDisplayName);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(event, session);

            if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session?.user) {
                dispatch(userModel.setUser(session.user));
            }

            if (event === 'SIGNED_OUT') {
                dispatch(userModel.setUser(null));
            }

            if (session) {
                dispatch(userModel.setSession(session));
            }

            setSession(session);
            setInitializing(true);
        });

        return () => {
            authListener.subscription;
        };
    }, []);

    useEffect(() => {
        // syntetic waiting
        if (initializing) {
            new Promise((resolve) => setTimeout(resolve, 2000)).then(async () => {
                await SplashScreen.hideAsync();
            });
        }
    }, [initializing]);

    return <>{children}</>;
};
