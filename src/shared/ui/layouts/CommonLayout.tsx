import React, { FunctionComponent, PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface CommonLayoutProps {
    externalStyles?: ViewStyle;
    showBackButton?: boolean;
}

const CommonLayout: FunctionComponent<CommonLayoutProps & PropsWithChildren> = ({ children, externalStyles }) => {
    return <View style={[styles.container, externalStyles]}>{children}</View>;
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
