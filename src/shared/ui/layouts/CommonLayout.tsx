import React, { FunctionComponent, PropsWithChildren } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CommonLayoutProps {
    externalStyles?: ViewStyle;
    showBackButton?: boolean;
}

const CommonLayout: FunctionComponent<CommonLayoutProps & PropsWithChildren> = ({ children, externalStyles }) => {
    return (
        <SafeAreaView edges={['bottom']} style={[styles.container, externalStyles]}>
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
