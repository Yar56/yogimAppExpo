import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';

import { ChangeTheme } from '@/features/changeTheme';

import { useAppTheme } from '@/shared/lib/theme';
import { RoutineScreen } from '@/shared/routing/NavigationEntities';
import { CustomHeader } from '@/shared/ui/components';

const RoutineStack = createNativeStackNavigator<RootStackParamList>();

export const RoutineStackScreen: FunctionComponent<StackScreenProps> = ({ screenRoutes }) => {
    const theme = useAppTheme();
    const baseStackColor = theme.colors.colorLevel5;
    const CourseStackColor = theme.dark ? theme.colors.colorLevel6 : theme.colors.colorLevel2;
    return (
        <RoutineStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: baseStackColor },
                header: (props) => (
                    <CustomHeader headerProps={props} theme={theme} changeThemeComponent={<ChangeTheme />} />
                ),
            }}
        >
            {screenRoutes.map((route) => {
                return (
                    <RoutineStack.Screen
                        options={{
                            headerTransparent: route.name === RoutineScreen.COURSE,
                            contentStyle: {
                                backgroundColor:
                                    route.name === RoutineScreen.COURSE ? CourseStackColor : baseStackColor,
                            },
                        }}
                        key={route.name}
                        component={route.component}
                        name={route.name}
                    />
                );
            })}
        </RoutineStack.Navigator>
    );
};
