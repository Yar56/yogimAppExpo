// import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, Portal } from 'react-native-paper';

// import { customDarkColors, customLightColors } from '../styles/themes';

export const MaterialThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const colorScheme = useColorScheme();

    const { theme } = useMaterial3Theme();

    // const [theme, setTheme] = React.useState<'light' | 'dark'>(colorScheme === 'dark' ? 'dark' : 'light');
    // console.log(colorScheme);
    // useEffect(() => {
    //     if (colorScheme === 'dark') {
    //         setTheme('dark');
    //     } else {
    //         setTheme('light');
    //     }
    // }, [colorScheme]);

    // function toggleTheme() {
    //     setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
    // }
    // const preferences = React.useMemo(
    //     () => ({
    //         toggleTheme,
    //         theme,
    //     }),
    //     [theme]
    // );

    const paperTheme =
        colorScheme === 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light };

    // console.log(theme, preferences);
    console.log(colorScheme);
    return (
        // <PreferencesContext.Provider value={preferences}>
        <PaperProvider
            theme={paperTheme}
            // theme={
            //     theme === 'light'
            //         ? {
            //               ...MD3LightTheme,
            //               colors: { ...MD3LightTheme.colors, ...customLightColors },
            //           }
            //         : {
            //               ...MD3DarkTheme,
            //               colors: { ...MD3DarkTheme.colors, ...customDarkColors },
            //           }
            // }
            // theme={{ ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, primary: '#1ba1f2' } }}
        >
            <Portal>{children}</Portal>
        </PaperProvider>
        // </PreferencesContext.Provider>
    );
};
