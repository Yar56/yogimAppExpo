import React, { FunctionComponent, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface LoadingWrapperProps {
    isLoading: boolean;
}

export const LoadingWrapper: FunctionComponent<LoadingWrapperProps & PropsWithChildren> = ({ children, isLoading }) => {
    if (isLoading) {
        return (
            <>
                <ActivityIndicator
                    style={{
                        position: 'absolute',
                        top: '25%',
                        left: '42%',
                        zIndex: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size="large"
                    animating
                    color="#156494"
                />
                <View style={{ pointerEvents: 'none', opacity: 0.5 }}>{children}</View>
            </>
        );
    }

    return <>{children}</>;
};
