import React, { FunctionComponent, PropsWithChildren } from 'react';
import { View } from 'react-native';

import { Loader } from '@/shared/ui/components';

interface LoadingWrapperProps {
    isLoading: boolean;
}

export const LoadingWrapper: FunctionComponent<LoadingWrapperProps & PropsWithChildren> = ({ children, isLoading }) => {
    if (isLoading) {
        return (
            <>
                <Loader
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
                />
                <View style={{ pointerEvents: 'none', opacity: 0.5 }}>{children}</View>
            </>
        );
    }

    return <>{children}</>;
};
