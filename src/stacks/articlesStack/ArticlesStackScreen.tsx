import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { articlesRoutes } from '../../shared/routing/routes';
import CustomHeader from '../../shared/ui/components/CustomHeader';

const CoursesStack = createNativeStackNavigator<RootStackParamList>();

const baseStackColor = '#022B42';
const ArticleStackColor = '#032030';

export const ArticlesStackScreen = () => {
    return (
        <CoursesStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: baseStackColor },
                header: (props) => <CustomHeader headerProps={props} />,
            }}
        >
            {articlesRoutes.map((route) => {
                return (
                    <CoursesStack.Screen
                        options={{
                            title: route.title,
                            headerTransparent: route.name === 'Article',
                            contentStyle: {
                                backgroundColor: route.name === 'Article' ? ArticleStackColor : baseStackColor,
                            },
                        }}
                        key={route.name}
                        {...route}
                    />
                );
            })}
        </CoursesStack.Navigator>
    );
};
