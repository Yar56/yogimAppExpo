import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { ColorSchemeName } from 'react-native/Libraries/Utilities/Appearance';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, Portal, ProviderProps } from 'react-native-paper';

import { ThemeProviderContext } from '@/features/changeTheme';

import { customDarkColors, customLightColors } from '@/shared/lib/styles';

export const Material3ThemeProvider = ({
    children,
    sourceColor,
    fallbackSourceColor,
}: ProviderProps & { sourceColor?: string; fallbackSourceColor?: string }) => {
    const colorScheme = useColorScheme();

    const [currentColorScheme, setCurrentColorScheme] = useState(() => colorScheme);
    const updateTheme = (schemeName: ColorSchemeName) => setCurrentColorScheme(schemeName);

    const { theme } = useMaterial3Theme({
        sourceColor,
        fallbackSourceColor,
    });

    const paperTheme =
        currentColorScheme === 'dark'
            ? { ...MD3DarkTheme, colors: { ...theme.dark, ...customDarkColors } }
            : { ...MD3LightTheme, colors: { ...theme.light, ...customLightColors } };

    return (
        <ThemeProviderContext theme={theme} updateTheme={updateTheme}>
            <PaperProvider theme={paperTheme}>
                <Portal>{children}</Portal>
            </PaperProvider>
        </ThemeProviderContext>
    );
};
