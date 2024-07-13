import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';

import { useAppTheme } from '@/shared/lib/theme';

const AuthStack = createNativeStackNavigator<RootStackParamList>();

export const AuthStackScreen: FunctionComponent<StackScreenProps> = ({ screenRoutes }) => {
    const theme = useAppTheme();
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
                navigationBarColor: theme.dark ? theme.colors.colorLevel6 : theme.colors.colorLevel2,
            }}
        >
            {screenRoutes.map((route) => {
                return <AuthStack.Screen key={route.name} name={route.name} component={route.component} />;
            })}
        </AuthStack.Navigator>
    );
};
