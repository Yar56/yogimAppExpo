import React, { FunctionComponent } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native-paper';

import { useAppTheme } from '@/shared/lib/theme';

interface LoaderProps {}
export const Loader: FunctionComponent<LoaderProps & ActivityIndicatorProps> = ({ style, animating, size }) => {
    const theme = useAppTheme();

    return <ActivityIndicator style={style} size={size} animating={animating} color={theme.colors.colorLevel4} />;
};
