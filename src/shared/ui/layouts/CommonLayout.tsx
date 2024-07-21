import React, { FunctionComponent, PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/shared/lib/theme';

interface CommonLayoutProps {
    externalStyles?: StyleProp<ViewStyle>;
    showBackButton?: boolean;
    edges?: Edges;
}

export const CommonLayout: FunctionComponent<CommonLayoutProps & PropsWithChildren> = ({
    children,
    externalStyles,
    edges = ['bottom'],
}) => {
    const theme = useAppTheme();
    return (
        <SafeAreaView
            edges={edges as Edges}
            style={[
                styles.container,
                { backgroundColor: theme.dark ? theme.colors.colorLevel6 : theme.colors.colorLevel2 },
                externalStyles,
            ]}
        >
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
});
