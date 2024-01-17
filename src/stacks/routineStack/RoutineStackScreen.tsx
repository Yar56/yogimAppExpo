import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { routineRoutes } from '../../shared/routing/routes';
import HeaderTitle from '../../shared/ui/components/HeaderTitle';

const RoutineStack = createNativeStackNavigator();

export const RoutineStackScreen = () => {
    return (
        <RoutineStack.Navigator screenOptions={{ headerTitle: HeaderTitle }}>
            {routineRoutes.map((route) => {
                return <RoutineStack.Screen options={{ title: route.title }} key={route.name} {...route} />;
            })}
        </RoutineStack.Navigator>
    );
};
