import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useAppTheme } from '@/shared/lib/theme';
import { profileRoutes } from '@/shared/routing/routes';
import { CustomHeader } from '@/shared/ui/components';

const ProfileStack = createNativeStackNavigator<RootStackParamList>();

export const ProfileStackScreen = () => {
    const theme = useAppTheme();
    const baseStackColor = theme.colors.colorLevel5;

    return (
        <ProfileStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: baseStackColor },
                header: (props) => <CustomHeader headerProps={props} />,
            }}
        >
            {profileRoutes.map((route) => {
                return <ProfileStack.Screen key={route.name} {...route} />;
            })}
        </ProfileStack.Navigator>
    );
};
