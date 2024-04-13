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
