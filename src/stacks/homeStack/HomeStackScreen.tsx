import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { homeRoutes } from '../../shared/routing/routes';
import CustomHeader from '../../shared/ui/components/CustomHeader';

const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: '#022B42' },
                header: (props) => <CustomHeader headerProps={props} />,
            }}
        >
            {homeRoutes.map((route) => {
                return <HomeStack.Screen options={{ title: route.title }} key={route.name} {...route} />;
            })}
        </HomeStack.Navigator>
    );
};
