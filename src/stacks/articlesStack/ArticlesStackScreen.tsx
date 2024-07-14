import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';

import { ChangeTheme } from '@/features/changeTheme';

import { useAppTheme } from '@/shared/lib/theme';
import { ArticlesScreen } from '@/shared/routing/NavigationEntities';
import { CustomHeader } from '@/shared/ui/components';
const CoursesStack = createNativeStackNavigator<RootStackParamList>();

export const ArticlesStackScreen: FunctionComponent<StackScreenProps> = ({ screenRoutes }) => {
    const theme = useAppTheme();
    const baseStackColor = theme.colors.colorLevel5;
    const ArticleStackColor = theme.dark ? theme.colors.colorLevel6 : theme.colors.colorLevel2;

    return (
        <CoursesStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: baseStackColor },
                header: (props) => (
                    <CustomHeader headerProps={props} theme={theme} changeThemeComponent={<ChangeTheme />} />
                ),
            }}
        >
            {screenRoutes.map((route) => {
                return (
                    <CoursesStack.Screen
                        options={{
                            headerTransparent: route.name === ArticlesScreen.ARTICLE,
                            contentStyle: {
                                backgroundColor:
                                    route.name === ArticlesScreen.ARTICLE ? ArticleStackColor : baseStackColor,
                            },
                        }}
                        key={route.name}
                        name={route.name}
                        component={route.component}
                    />
                );
            })}
        </CoursesStack.Navigator>
    );
};
