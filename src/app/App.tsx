import { SafeAreaProvider } from 'react-native-safe-area-context';

import { MaterialThemeProvider } from './providers/MaterialThemeProvider';
import { TabNavigatorProvider } from './providers/NavigatorProvider';
import { ReduxProvider } from './providers/ReduxProvider';

export default function App() {
    return (
        <ReduxProvider>
            <SafeAreaProvider>
                <MaterialThemeProvider>
                    {/*<AuthProvider>*/}
                    <TabNavigatorProvider />
                    {/*</AuthProvider>*/}
                </MaterialThemeProvider>
            </SafeAreaProvider>
        </ReduxProvider>
    );
}
