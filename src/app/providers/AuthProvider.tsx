import * as SplashScreen from 'expo-splash-screen';
import { FunctionComponent, PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { userModel } from '../../entities/user';
import { IUser } from '../../shared/api/fireBase/models';
import { checkAuthUser } from '../../shared/api/fireBase/user';
import { SplashScreenComponent } from '../../shared/ui/components/splashScreen/SplashScreen';
import { useAppDispatch, useAppSelector } from '../store/hooks';

SplashScreen.preventAutoHideAsync();

export const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();
    const [initializing, setInitializing] = useState(false);
    const userDisplayName = useAppSelector((state) => state.userState.user?.displayName);
    const cachedDisplayName = useAppSelector((state) => state.userState.cachedDisplayName);

    // Handle user state changes
    const onAuthStateChanged = useCallback(
        async (user: IUser | null) => {
            dispatch(userModel.setUser(user));

            // syntetic waiting
            await new Promise((resolve) => setTimeout(resolve, 2000));
            if (!userDisplayName && cachedDisplayName) {
                dispatch(userModel.updateUserThunk({ displayName: cachedDisplayName }));
                dispatch(userModel.setCachedDisplayName(null));
            }

            if (!initializing) {
                setInitializing(true);
                await SplashScreen.hideAsync();
            }
        },
        [cachedDisplayName, dispatch, initializing, userDisplayName]
    );

    useEffect(() => {
        const subscriber = checkAuthUser(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [onAuthStateChanged]);

    if (!initializing) {
        return <SplashScreenComponent />;
    }

    return <>{children}</>;
};
