import React, { FunctionComponent, PropsWithChildren } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { screenHeight, screenWidth } from '../../../constants/screenSize';

interface LoadingWrapper {
    isLoading: boolean;
}

export const LoadingWrapper: FunctionComponent<LoadingWrapper & PropsWithChildren> = ({ children, isLoading }) => {
    if (isLoading) {
        return (
            <>
                <ActivityIndicator
                    style={{
                        position: 'absolute',
                        top: screenHeight / 2.3,
                        left: screenWidth / 2.3,
                        zIndex: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size={'large'}
                    animating={true}
                    color={'#635096'}
                />
                {children}
            </>
        );
    }

    return <>{children}</>;
};
