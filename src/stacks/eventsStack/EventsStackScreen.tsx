import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { eventsRoutes } from '../../shared/routing/routes';
import CustomHeader from '../../shared/ui/components/CustomHeader';

const EventsStack = createNativeStackNavigator();

export const EventsStackScreen = () => {
    return (
        <EventsStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: '#022B42' },
                header: (props) => <CustomHeader headerProps={props} />,
            }}
        >
            {eventsRoutes.map((route) => {
                return <EventsStack.Screen options={{ title: route.title }} key={route.name} {...route} />;
            })}
        </EventsStack.Navigator>
    );
};
