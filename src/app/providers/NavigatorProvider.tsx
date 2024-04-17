import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { HomeScreen, TabName } from '../../shared/routing/NavigationEntities';
import CustomTabBarIcon from '../../shared/ui/components/CustomTabBarIcon';
import { ArticlesStackScreen } from '../../stacks/articlesStack/ArticlesStackScreen';
import { AuthStackScreen } from '../../stacks/authStack/AuthStackScreen';
// import { EventsStackScreen } from '../../stacks/eventsStack/EventsStackScreen';
import { HomeStackScreen } from '../../stacks/homeStack/HomeStackScreen';
import { ProfileStackScreen } from '../../stacks/profileStack/ProfileStackScreen';
import { RoutineStackScreen } from '../../stacks/routineStack/RoutineStackScreen';
import { useAppSelector } from '../store/hooks';

const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);

    const hideOnScreens = [HomeScreen.MEDITATION]; // put here name of screen where you want to hide tabBar
    return hideOnScreens.indexOf(routeName as HomeScreen) <= -1;
};

export const TabNavigatorProvider: FunctionComponent<PropsWithChildren> = () => {
    const session = useAppSelector((state) => state.userState.session);
    const isSignIn = session?.user;
    // const theme = useTheme();
    // const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
    // const iconColor = theme.dark ? '#CB7E84' : '#8F4E73';
    const navigationTheme = DarkTheme;
    // const iconColor = '#b97a7f';
    const isIos = Platform.OS === 'ios';

    return (
        <NavigationContainer theme={navigationTheme}>
            <>
                {isSignIn ? (
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarActiveTintColor: '#b97a7f',
                            tabBarInactiveTintColor: 'rgba(4,115,171,0.8)',
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
                                    intensity={80}
                                    tint="dark"
                                    style={{
                                        ...StyleSheet.absoluteFillObject,
                                        borderTopRightRadius: 30,
                                        borderTopLeftRadius: 30,
                                        overflow: 'hidden',
                                        backgroundColor: 'rgba(0,77,116, 0.1)',
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
                                tabBarIcon: ({ focused, color }) => (
                                    <CustomTabBarIcon iconName="home" focused={focused} color={color} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name={TabName.ARTICLES_TAB}
                            component={ArticlesStackScreen}
                            options={{
                                tabBarLabel: 'Статьи',
                                tabBarIcon: ({ focused, color }) => (
                                    <CustomTabBarIcon iconName="book" focused={focused} color={color} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name={TabName.ROUTINE_TAB}
                            component={RoutineStackScreen}
                            options={() => ({
                                tabBarLabel: 'Йожить',
                                tabBarIcon: ({ focused, color }) => (
                                    <CustomTabBarIcon iconName="yoga" focused={focused} color={color} />
                                ),
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
                                tabBarIcon: ({ focused, color }) => (
                                    <CustomTabBarIcon iconName="account" focused={focused} color={color} />
                                ),
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
