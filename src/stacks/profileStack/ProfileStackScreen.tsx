import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { profileRoutes } from '../../shared/routing/routes';
import CustomHeader from '../../shared/ui/components/CustomHeader';

const ProfileStack = createNativeStackNavigator<RootStackParamList>();

export const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: '#022B42' },
                header: (props) => <CustomHeader headerProps={props} />,
            }}
        >
            {profileRoutes.map((route) => {
                return <ProfileStack.Screen key={route.name} {...route} />;
            })}
        </ProfileStack.Navigator>
    );
};
