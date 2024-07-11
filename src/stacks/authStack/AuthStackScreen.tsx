import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useAppTheme } from '@/shared/lib/theme';
import { authRoutes } from '@/shared/routing/routes';

const AuthStack = createNativeStackNavigator<RootStackParamList>();

export const AuthStackScreen = () => {
    const theme = useAppTheme();
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
                navigationBarColor: theme.dark ? theme.colors.colorLevel6 : theme.colors.colorLevel2,
            }}
        >
            {authRoutes.map((route) => {
                return <AuthStack.Screen key={route.name} {...route} />;
            })}
        </AuthStack.Navigator>
    );
};
