import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';

import { ChangeTheme } from '@/features/changeTheme';

import { useAppTheme } from '@/shared/lib/theme';
import { HomeScreen } from '@/shared/routing/NavigationEntities';
import { CustomHeader } from '@/shared/ui/components';

const HomeStack = createNativeStackNavigator<RootStackParamList>();

export const HomeStackScreen: FunctionComponent<StackScreenProps> = ({ screenRoutes }) => {
    const theme = useAppTheme();
    const baseStackColor = theme.colors.colorLevel5;
    const HomeStackColor = theme.dark ? theme.colors.colorLevel6 : theme.colors.colorLevel2;

    return (
        <HomeStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: baseStackColor },
                header: (props) => (
                    <CustomHeader headerProps={props} theme={theme} changeThemeComponent={<ChangeTheme />} />
                ),
            }}
        >
            {screenRoutes.map((route) => {
                return (
                    <HomeStack.Screen
                        options={{
                            headerTransparent: route.name === HomeScreen.HOME || route.name === HomeScreen.MEDITATION,
                            contentStyle: {
                                backgroundColor:
                                    route.name === HomeScreen.HOME || route.name === HomeScreen.MEDITATION
                                        ? HomeStackColor
                                        : baseStackColor,
                            },
                        }}
                        key={route.name}
                        name={route.name}
                        component={route.component}
                    />
                );
            })}
        </HomeStack.Navigator>
    );
};
