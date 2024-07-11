import { AntDesign } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ChangeTheme } from '@/features/changeTheme';

import { useAppTheme } from '@/shared/lib/theme';

import { LOGO } from '../../constants/resourses';
import { ArticlesScreen, HomeScreen, RoutineScreen } from '../../routing/NavigationEntities';

interface CustomHeaderProps {
    headerProps: NativeStackHeaderProps;
}
export const CustomHeader: FunctionComponent<CustomHeaderProps> = ({ headerProps }) => {
    const isTransparentPage =
        headerProps.route.name === ArticlesScreen.ARTICLE ||
        headerProps.route.name === RoutineScreen.COURSE ||
        headerProps.route.name === HomeScreen.HOME ||
        headerProps.route.name === HomeScreen.MEDITATION;

    // const isShowChangeTheme = headerProps.route.name === HomeScreen.MEDITATION;

    const theme = useAppTheme();

    const headerBackgroundColor = theme.colors.colorLevel5;

    return (
        <View style={wrapperStyles(isTransparentPage, headerBackgroundColor).wrapper}>
            {headerProps.navigation.canGoBack() && headerProps.navigation.getState().index !== 0 && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        headerProps.navigation.goBack();
                    }}
                >
                    <AntDesign name="left" size={25} color="#628ecb" style={styles.buttonIcon} />
                </TouchableOpacity>
            )}
            {!isTransparentPage && (
                <View style={styles.headerWrapper}>
                    <Image source={LOGO} style={styles.headerLogo} />
                    <Text variant="headlineSmall" onPress={() => headerProps.navigation.goBack()}>
                        Йожим
                    </Text>
                </View>
            )}
            <ChangeTheme />
        </View>
    );
};

const wrapperStyles = (isTransparentPage: boolean, headerBackgroundColor: string) =>
    StyleSheet.create({
        wrapper: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 105,
            backgroundColor: isTransparentPage ? 'transparent' : headerBackgroundColor,
            paddingTop: 40,
            position: 'relative',
        },
    });

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        left: 5,
        bottom: '25%',
    },
    buttonIcon: {
        paddingLeft: 10,
    },
    headerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLogo: {
        width: 70,
        height: 70,
        marginRight: 0,
    },
});
