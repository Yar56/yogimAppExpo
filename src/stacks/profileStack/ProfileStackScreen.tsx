import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { profileRoutes } from '../../shared/routing/routes';
import CustomHeader from '../../shared/ui/components/CustomHeader';

const ProfileStack = createNativeStackNavigator();

export const ProfileStackScreen = ({ navigation }) => {
    // navigation?.setOptions({ tabBarVisible: false });
    return (
        <ProfileStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: '#022B42' },
                header: (props) => <CustomHeader headerProps={props} />,
            }}
        >
            {profileRoutes.map((route) => {
                return <ProfileStack.Screen options={{ title: route.title }} key={route.name} {...route} />;
            })}
        </ProfileStack.Navigator>
    );
};
