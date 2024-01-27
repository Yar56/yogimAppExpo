import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { authRoutes } from '../../shared/routing/routes';

const AuthStack = createNativeStackNavigator();

export const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {authRoutes.map((route) => {
                return <AuthStack.Screen key={route.name} {...route} />;
            })}
        </AuthStack.Navigator>
    );
};
