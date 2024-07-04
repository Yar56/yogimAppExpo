import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useAppTheme } from '@/app/providers/MaterialThemeProvider';
import { HomeScreen } from '@/shared/routing/NavigationEntities';
import { homeRoutes } from '@/shared/routing/routes';
import CustomHeader from '@/shared/ui/components/CustomHeader';

const HomeStack = createNativeStackNavigator<RootStackParamList>();

export const HomeStackScreen = () => {
    const theme = useAppTheme();
    const baseStackColor = theme.colors.colorLevel5;
    const HomeStackColor = theme.dark ? theme.colors.colorLevel6 : theme.colors.colorLevel2;

    return (
        <HomeStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: baseStackColor },
                header: (props) => <CustomHeader headerProps={props} />,
            }}
        >
            {homeRoutes.map((route) => {
                return (
                    <HomeStack.Screen
                        options={{
                            title: route.title,
                            headerTransparent: route.name === HomeScreen.HOME || route.name === HomeScreen.MEDITATION,
                            contentStyle: {
                                backgroundColor:
                                    route.name === HomeScreen.HOME || route.name === HomeScreen.MEDITATION
                                        ? HomeStackColor
                                        : baseStackColor,
                            },
                        }}
                        key={route.name}
                        {...route}
                    />
                );
            })}
        </HomeStack.Navigator>
    );
};
