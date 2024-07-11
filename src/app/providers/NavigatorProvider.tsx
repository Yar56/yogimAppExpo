import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import { DarkTheme, NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { ArticlesStackScreen } from '@/stacks/articlesStack';
import { AuthStackScreen } from '@/stacks/authStack';
import { HomeStackScreen } from '@/stacks/homeStack';
import { ProfileStackScreen } from '@/stacks/profileStack';
import { RoutineStackScreen } from '@/stacks/routineStack';

import { useAppSelector } from '@/shared/lib/redux';
import { useAppTheme } from '@/shared/lib/theme';
import { HomeScreen, TabName } from '@/shared/routing/NavigationEntities';
import { CustomTabBarIcon } from '@/shared/ui/components';

const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);

    const hideOnScreens = [HomeScreen.MEDITATION]; // put here name of screen where you want to hide tabBar
    return hideOnScreens.indexOf(routeName as HomeScreen) <= -1;
};

export const TabNavigatorProvider: FunctionComponent<PropsWithChildren> = () => {
    const session = useAppSelector((state) => state.userState.session);
    const isSignIn = Boolean(session && session?.user);
    const theme = useAppTheme();

    const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
    const iconColorActive = theme.dark ? '#84a4c2' : '#9AC0E3';
    const iconColorInActive = theme.dark ? 'rgba(4,115,171,0.8)' : '#848484';

    const isIos = Platform.OS === 'ios';

    return (
        <NavigationContainer theme={navigationTheme}>
            <>
                {isSignIn ? (
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarActiveTintColor: iconColorActive,
                            tabBarInactiveTintColor: iconColorInActive,
                            tabBarStyle: {
                                position: 'absolute',
                                height: isIos ? 80 : 65,
                                borderTopRightRadius: 30,
                                borderTopLeftRadius: 30,
                                elevation: 0,
                                shadowOpacity: 0,
                                display: !getTabBarVisibility(route) ? 'none' : 'flex',
                            },
                            tabBarBackground: () => (
                                <BlurView
                                    intensity={95}
                                    tint={theme.dark ? 'dark' : 'light'}
                                    style={{
                                        ...StyleSheet.absoluteFillObject,
                                        borderTopRightRadius: 30,
                                        borderTopLeftRadius: 30,
                                        overflow: 'hidden',
                                        backgroundColor: theme.colors.colorLevel6,
                                    }}
                                />
                            ),
                        })}
                        // tabBar={(props) => <TabBar {...props} />}
                        initialRouteName={TabName.HOME_TAB}
                    >
                        <Tab.Screen
                            name={TabName.HOME_TAB}
                            component={HomeStackScreen}
                            options={{
                                tabBarLabel: 'Домой',
                                tabBarIcon: ({ color }) => <CustomTabBarIcon iconName="home" color={color} />,
                            }}
                        />
                        <Tab.Screen
                            name={TabName.ARTICLES_TAB}
                            component={ArticlesStackScreen}
                            options={{
                                tabBarLabel: 'Статьи',
                                tabBarIcon: ({ color }) => <CustomTabBarIcon iconName="book" color={color} />,
                            }}
                        />
                        <Tab.Screen
                            name={TabName.ROUTINE_TAB}
                            component={RoutineStackScreen}
                            options={() => ({
                                tabBarLabel: 'Йожить',
                                tabBarIcon: ({ color }) => <CustomTabBarIcon iconName="yoga" color={color} />,
                            })}
                        />
                        {/*<Tab.Screen*/}
                        {/*    name={TabName.EVENTS_TAB}*/}
                        {/*    component={EventsStackScreen}*/}
                        {/*    options={{*/}
                        {/*        tabBarLabel: 'События',*/}
                        {/*        tabBarIcon: ({ focused, color }) => (*/}
                        {/*            <CustomTabBarIcon*/}
                        {/*                iconName="hexagon-multiple-outline"*/}
                        {/*                focused={focused}*/}
                        {/*                color={color}*/}
                        {/*            />*/}
                        {/*        ),*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <Tab.Screen
                            name={TabName.PROFILE_TAB}
                            component={ProfileStackScreen}
                            options={{
                                tabBarLabel: 'Профиль',
                                tabBarIcon: ({ color }) => <CustomTabBarIcon iconName="account" color={color} />,
                            }}
                        />
                    </Tab.Navigator>
                ) : (
                    <AuthStackScreen />
                )}
            </>
        </NavigationContainer>
    );
};
