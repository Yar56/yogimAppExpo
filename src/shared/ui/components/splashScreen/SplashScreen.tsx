import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const SplashScreenComponent = () => {
    console.log('Splash view');
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator animating color="red" />
        </View>
    );
};
