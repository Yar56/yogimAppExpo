import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { homeRoutes } from '../../shared/routing/routes';
import HeaderTitle from '../../shared/ui/components/HeaderTitle';

const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerTitle: HeaderTitle }}>
            {homeRoutes.map((route) => {
                return <HomeStack.Screen options={{ title: route.title }} key={route.name} {...route} />;
            })}
        </HomeStack.Navigator>
    );
};
