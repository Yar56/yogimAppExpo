import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';

import { AuthProvider } from '@/app/providers/AuthProvider';
import { Material3ThemeProvider } from '@/app/providers/MaterialThemeProvider';
import { TabNavigatorProvider } from '@/app/providers/NavigatorProvider';
import { ReduxProvider } from '@/app/providers/ReduxProvider';

import { trackPlayerServices } from '@/shared/lib/audio';

try {
    TrackPlayer.registerPlaybackService(() => trackPlayerServices.playbackService);
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
