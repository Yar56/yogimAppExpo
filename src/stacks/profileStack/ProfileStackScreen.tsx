import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { profileRoutes } from '../../shared/routing/routes';

const ProfileStack = createNativeStackNavigator();

export const ProfileStackScreen = ({ navigation }) => {
    // navigation?.setOptions({ tabBarVisible: false });
    return (
        <ProfileStack.Navigator>
            {profileRoutes.map((route) => {
                return <ProfileStack.Screen options={{ headerShown: false }} key={route.name} {...route} />;
            })}
        </ProfileStack.Navigator>
    );
};
