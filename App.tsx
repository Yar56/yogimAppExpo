import { useEffect } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';

import { AuthProvider } from './src/app/providers/AuthProvider';
import { MaterialThemeProvider } from './src/app/providers/MaterialThemeProvider';
import { TabNavigatorProvider } from './src/app/providers/NavigatorProvider';
import { ReduxProvider } from './src/app/providers/ReduxProvider';
import { playbackService } from './src/shared/lib/audio/trackPlayerServices';

try {
    TrackPlayer.registerPlaybackService(() => playbackService);
} catch (e) {
    console.error(e);
}

export default function App() {
    const theme = useColorScheme();

    console.log(Appearance.getColorScheme(), 'Appearance.getColorScheme()');
    console.log(theme, 'colorScheme main');
    alert('your color scheme is: ' + theme);
    // useEffect(() => {
    //     Appearance.setColorScheme('dark');
    // }, []);
    return (
        <ReduxProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <MaterialThemeProvider>
                        <AuthProvider>
                            <TabNavigatorProvider />
                        </AuthProvider>
                    </MaterialThemeProvider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </ReduxProvider>
    );
}
