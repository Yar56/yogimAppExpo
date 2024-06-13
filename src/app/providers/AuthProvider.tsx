import { Session } from '@supabase/supabase-js';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';

import { userModel } from '../../entities/user';
import { fetchProfileDB } from '../../entities/user/model';
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
        NavigationBar.setBackgroundColorAsync('rgba(0, 0, 0, 0)');
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session?.user) {
                dispatch(userModel.setUser(session.user));
            }

            if (event === 'SIGNED_OUT') {
                dispatch(userModel.setUser(null));
                dispatch(userModel.setSession(null));
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
        if (initializing && session) {
            dispatch(fetchProfileDB(session)).then(async () => {
                await NavigationBar.setBackgroundColorAsync('rgba(0, 0, 0, 0)');
                await SplashScreen.hideAsync();
            });
        }
    }, [initializing]);

    return <>{children}</>;
};
