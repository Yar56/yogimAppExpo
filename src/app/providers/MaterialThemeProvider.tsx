import React, { FunctionComponent, PropsWithChildren } from 'react';
import { MD3DarkTheme, PaperProvider, Portal } from 'react-native-paper';

export const MaterialThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    // const colorScheme = useColorScheme();
    // const [theme, setTheme] = React.useState<'light' | 'dark'>(colorScheme === 'dark' ? 'dark' : 'light');

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
    //         theme
    //     }),
    //     [theme]
    // );

    return (
        // <PreferencesContext.Provider value={preferences}>
        <PaperProvider
            // theme={
            //     theme === 'light'
            //         ? {
            //               ...MD3LightTheme,
            //               colors: { ...MD3LightTheme.colors, primary: '#1ba1f2' }
            //           }
            //         : {
            //               ...MD3DarkTheme,
            //               colors: { ...MD3DarkTheme.colors, primary: '#1ba1f2' }
            //           }
            // }
            theme={{ ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, primary: '#1ba1f2' } }}
        >
            <Portal>{children}</Portal>
        </PaperProvider>
        // </PreferencesContext.Provider>
    );
};
