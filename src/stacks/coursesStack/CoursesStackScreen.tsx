import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { coursesRoutes } from '../../shared/routing/routes';

const CoursesStack = createNativeStackNavigator<RootStackParamList>();

export const CoursesStackScreen = () => {
    return (
        <CoursesStack.Navigator>
            {coursesRoutes.map((route) => {
                return <CoursesStack.Screen options={{ headerShown: false }} key={route.name} {...route} />;
            })}
        </CoursesStack.Navigator>
    );
};
