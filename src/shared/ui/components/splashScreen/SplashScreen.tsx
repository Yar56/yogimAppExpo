import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const SplashScreenComponent = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator animating={true} color="red" />
        </View>
    );
};
