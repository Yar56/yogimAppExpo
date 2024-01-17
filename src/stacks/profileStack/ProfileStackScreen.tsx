import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { profileRoutes } from '../../shared/routing/routes';
import HeaderTitle from '../../shared/ui/components/HeaderTitle';

const ProfileStack = createNativeStackNavigator();

export const ProfileStackScreen = ({ navigation }) => {
    // navigation?.setOptions({ tabBarVisible: false });
    return (
        <ProfileStack.Navigator screenOptions={{ headerTitle: HeaderTitle }}>
            {profileRoutes.map((route) => {
                return <ProfileStack.Screen options={{ title: route.title }} key={route.name} {...route} />;
            })}
        </ProfileStack.Navigator>
    );
};
