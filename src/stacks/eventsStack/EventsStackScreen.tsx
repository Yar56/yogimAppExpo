import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { eventsRoutes } from '../../shared/routing/routes';
import HeaderTitle from '../../shared/ui/components/HeaderTitle';

const EventsStack = createNativeStackNavigator();

export const EventsStackScreen = () => {
    return (
        <EventsStack.Navigator screenOptions={{ headerTitle: HeaderTitle }}>
            {eventsRoutes.map((route) => {
                return <EventsStack.Screen options={{ title: route.title }} key={route.name} {...route} />;
            })}
        </EventsStack.Navigator>
    );
};
