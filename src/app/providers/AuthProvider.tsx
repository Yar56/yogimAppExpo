import { FunctionComponent, PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { userModel } from '../../entities/user';
import { IUser } from '../../shared/api/fireBase/models';
import { checkAuthUser } from '../../shared/api/fireBase/user';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();
    const [initializing, setInitializing] = useState(true);
    const userDisplayName = useAppSelector((state) => state.userState.user?.displayName);
    const cachedDisplayName = useAppSelector((state) => state.userState.cachedDisplayName);

    // Handle user state changes
    const onAuthStateChanged = useCallback(
        (user: IUser | null): void => {
            dispatch(userModel.setUser(user));

            if (!userDisplayName && cachedDisplayName) {
                dispatch(userModel.updateUserThunk({ displayName: cachedDisplayName }));
                dispatch(userModel.setCachedDisplayName(null));
            }

            if (initializing) {
                setInitializing(false);
                // BootSplash.hide({ fade: true });
            }
        },
        [cachedDisplayName, dispatch, initializing, userDisplayName]
    );

    useEffect(() => {
        const subscriber = checkAuthUser(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [onAuthStateChanged]);

    return <>{children}</>;
};
