import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { homeRoutes } from '../../shared/routing/routes';

const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            {homeRoutes.map((route) => {
                return <HomeStack.Screen options={{ headerShown: false }} key={route.name} {...route} />;
            })}
        </HomeStack.Navigator>
    );
};
