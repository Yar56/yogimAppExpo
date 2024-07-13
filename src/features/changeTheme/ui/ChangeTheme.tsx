import { FontAwesome, Octicons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { ColorSchemeName } from 'react-native/Libraries/Utilities/Appearance';

import { useAppTheme } from '@/shared/lib/theme';

import { useMaterial3ThemeContext } from '../context/ThemeProviderContext';

interface LikeArticleProps {}
export const ChangeTheme: FunctionComponent<LikeArticleProps> = () => {
    const theme = useAppTheme();
    const { updateTheme } = useMaterial3ThemeContext();
    const handleChangeTheme = (theme: ColorSchemeName) => () => {
        updateTheme(theme);
    };
    return theme.dark ? (
        <Octicons
            style={styles.iconLight}
            name="sun"
            color="#628ecb"
            suppressHighlighting
            size={25}
            onPress={handleChangeTheme('light')}
        />
    ) : (
        <FontAwesome
            style={styles.iconDark}
            name="moon-o"
            color="#628ecb"
            suppressHighlighting
            size={25}
            onPress={handleChangeTheme('dark')}
        />
    );
};

const styles = StyleSheet.create({
    iconLight: {
        position: 'absolute',
        right: 15,
        bottom: '25%',
    },
    iconDark: { position: 'absolute', right: 15, bottom: '25%' },
});
