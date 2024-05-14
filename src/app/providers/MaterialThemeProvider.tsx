import { Material3Scheme, Material3Theme, useMaterial3Theme } from '@pchmn/expo-material3-theme';
import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ColorSchemeName } from 'react-native/Libraries/Utilities/Appearance';
import {
    MD3DarkTheme,
    MD3LightTheme,
    MD3Theme,
    PaperProvider,
    Portal,
    ProviderProps,
    useTheme,
} from 'react-native-paper';

import { CustomColors, customDarkColors, customLightColors } from '../styles/themes';

type Material3ThemeProviderProps = {
    theme: Material3Theme;
    updateTheme: (schemeName: ColorSchemeName) => void;
};

const Material3ThemeProviderContext = createContext<Material3ThemeProviderProps>({} as Material3ThemeProviderProps);

export const Material3ThemeProvider = ({
    children,
    sourceColor,
    fallbackSourceColor,
    ...otherProps
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
        <Material3ThemeProviderContext.Provider value={{ theme, updateTheme }}>
            <PaperProvider theme={paperTheme} {...otherProps}>
                <Portal>{children}</Portal>
            </PaperProvider>
        </Material3ThemeProviderContext.Provider>
    );
};

export const useMaterial3ThemeContext = () => {
    const ctx = useContext(Material3ThemeProviderContext);
    if (!ctx) {
        throw new Error('useMaterial3ThemeContext must be used inside Material3ThemeProvider');
    }
    return ctx;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Merge<F, S> = any;

export const useAppTheme = useTheme<MD3Theme & { colors: Merge<Material3Scheme, CustomColors> }>;
