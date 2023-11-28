import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { routineRoutes } from '../../shared/routing/routes';

const RoutineStack = createNativeStackNavigator();

export const RoutineStackScreen = () => {
    return (
        <RoutineStack.Navigator>
            {routineRoutes.map((route) => {
                return <RoutineStack.Screen options={{ headerShown: false }} key={route.name} {...route} />;
            })}
        </RoutineStack.Navigator>
    );
};
