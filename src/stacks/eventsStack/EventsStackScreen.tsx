import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { coursesRoutes, eventsRoutes } from '../../shared/routing/routes';

const EventsStack = createNativeStackNavigator();

export const EventsStackScreen = () => {
    return (
        <EventsStack.Navigator>
            {eventsRoutes.map((route) => {
                return <EventsStack.Screen options={{ headerShown: false }} key={route.name} {...route} />;
            })}
        </EventsStack.Navigator>
    );
};
