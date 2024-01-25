import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { routineRoutes } from '../../shared/routing/routes';
import CustomHeader from '../../shared/ui/components/CustomHeader';

const RoutineStack = createNativeStackNavigator();

export const RoutineStackScreen = () => {
    return (
        <RoutineStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: '#022B42' },
                header: (props) => <CustomHeader headerProps={props} />,
            }}
        >
            {routineRoutes.map((route) => {
                return <RoutineStack.Screen options={{ title: route.title }} key={route.name} {...route} />;
            })}
        </RoutineStack.Navigator>
    );
};
