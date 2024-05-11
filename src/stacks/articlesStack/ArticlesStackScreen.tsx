import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useAppTheme } from '../../app/providers/MaterialThemeProvider';
import { ArticlesScreen } from '../../shared/routing/NavigationEntities';
import { articlesRoutes } from '../../shared/routing/routes';
import CustomHeader from '../../shared/ui/components/CustomHeader';

const CoursesStack = createNativeStackNavigator<RootStackParamList>();

export const ArticlesStackScreen = () => {
    const theme = useAppTheme();
    const baseStackColor = theme.colors.colorLevel5;
    const ArticleStackColor = theme.dark ? theme.colors.colorLevel6 : theme.colors.colorLevel2;

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
                            headerTransparent: route.name === ArticlesScreen.ARTICLE,
                            contentStyle: {
                                backgroundColor:
                                    route.name === ArticlesScreen.ARTICLE ? ArticleStackColor : baseStackColor,
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
