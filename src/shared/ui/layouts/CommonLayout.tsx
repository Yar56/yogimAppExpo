import React, { FunctionComponent, PropsWithChildren } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';

interface CommonLayoutProps {
    externalStyles?: ViewStyle;
    showBackButton?: boolean;
    edges?: Edges;
}

const CommonLayout: FunctionComponent<CommonLayoutProps & PropsWithChildren> = ({
    children,
    externalStyles,
    edges = ['bottom'],
}) => {
    return (
        <SafeAreaView edges={edges} style={[styles.container, externalStyles]}>
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
        backgroundColor: '#032030',
    },
});
export default CommonLayout;
