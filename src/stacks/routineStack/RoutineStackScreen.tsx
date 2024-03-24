import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { RoutineScreen } from '../../shared/routing/NavigationEntities';
import { routineRoutes } from '../../shared/routing/routes';
import CustomHeader from '../../shared/ui/components/CustomHeader';

const RoutineStack = createNativeStackNavigator<RootStackParamList>();

const baseStackColor = '#022B42';
const CourseStackColor = '#032030';

export const RoutineStackScreen = () => {
    return (
        <RoutineStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: baseStackColor },
                header: (props) => <CustomHeader headerProps={props} />,
            }}
        >
            {routineRoutes.map((route) => {
                return (
                    <RoutineStack.Screen
                        options={{
                            title: route.title,
                            headerTransparent: route.name === RoutineScreen.COURSE,
                            contentStyle: {
                                backgroundColor:
                                    route.name === RoutineScreen.COURSE ? CourseStackColor : baseStackColor,
                            },
                        }}
                        key={route.name}
                        {...route}
                    />
                );
            })}
        </RoutineStack.Navigator>
    );
};
