import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';

import { AuthProvider } from './src/app/providers/AuthProvider';
import { Material3ThemeProvider } from './src/app/providers/MaterialThemeProvider';
import { TabNavigatorProvider } from './src/app/providers/NavigatorProvider';
import { ReduxProvider } from './src/app/providers/ReduxProvider';
import { playbackService } from './src/shared/lib/audio/trackPlayerServices';

try {
    TrackPlayer.registerPlaybackService(() => playbackService);
} catch (e) {
    console.error(e);
}

export default function App() {
    return (
        <ReduxProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <Material3ThemeProvider>
                        <AuthProvider>
                            <TabNavigatorProvider />
                        </AuthProvider>
                    </Material3ThemeProvider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </ReduxProvider>
    );
}
