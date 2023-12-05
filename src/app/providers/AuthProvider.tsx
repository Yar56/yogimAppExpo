import * as SplashScreen from 'expo-splash-screen';
import { FunctionComponent, PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { userModel } from '../../entities/user';
import { fireBaseApi } from '../../shared/api';
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

            // todo перенести в Регистрацию и Авторизацию??
            if (user !== null) {
                const uid = user.uid;
                const userData = {
                    userData: {
                        email: user.email,
                        isAnonymous: user.isAnonymous,
                        emailVerified: user.emailVerified,
                        displayName: user.displayName,
                        uid,
                    },
                    lastLoginTime: new Date(),
                    buyingCoursesId: ['1'],
                };

                await fireBaseApi.user.setToDBUser(userData).then(() => {
                    dispatch(userModel.updateUserThunk({ user, displayName: user.displayName }));
                });
            }
            //

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
