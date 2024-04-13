import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { HomeScreen } from '../../shared/routing/NavigationEntities';
import { homeRoutes } from '../../shared/routing/routes';
import CustomHeader from '../../shared/ui/components/CustomHeader';

const HomeStack = createNativeStackNavigator<RootStackParamList>();

const baseStackColor = '#022B42';
const ArticleStackColor = '#032030';
export const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: '#022B42' },
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
                                        ? ArticleStackColor
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
