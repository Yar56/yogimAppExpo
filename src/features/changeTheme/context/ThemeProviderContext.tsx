import { Material3Theme } from '@pchmn/expo-material3-theme';
import { createContext, FunctionComponent, PropsWithChildren, useContext } from 'react';
import { ColorSchemeName } from 'react-native/Libraries/Utilities/Appearance';

const Material3ThemeProviderContext = createContext<Material3ThemeProviderProps>({} as Material3ThemeProviderProps);

export type Material3ThemeProviderProps = {
    theme: Material3Theme;
    updateTheme: (schemeName: ColorSchemeName) => void;
};
export const ThemeProviderContext: FunctionComponent<PropsWithChildren & Material3ThemeProviderProps> = ({
    children,
    theme,
    updateTheme,
}) => (
    <Material3ThemeProviderContext.Provider value={{ theme, updateTheme }}>
        {children}
    </Material3ThemeProviderContext.Provider>
);
export const useMaterial3ThemeContext = () => {
    const ctx = useContext(Material3ThemeProviderContext);
    if (!ctx) {
        throw new Error('useMaterial3ThemeContext must be used inside Material3ThemeProvider');
    }
    return ctx;
};
