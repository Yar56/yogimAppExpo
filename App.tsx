import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/app/providers/AuthProvider';
import { MaterialThemeProvider } from './src/app/providers/MaterialThemeProvider';
import { TabNavigatorProvider } from './src/app/providers/NavigatorProvider';
import { ReduxProvider } from './src/app/providers/ReduxProvider';

export default function App() {
    return (
        <ReduxProvider>
            <SafeAreaProvider>
                <MaterialThemeProvider>
                    <AuthProvider>
                        <TabNavigatorProvider />
                    </AuthProvider>
                </MaterialThemeProvider>
            </SafeAreaProvider>
        </ReduxProvider>
    );
}
