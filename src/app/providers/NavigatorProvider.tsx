import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Platform, StyleSheet } from 'react-native';

import CustomTabBarIcon from '../../shared/ui/components/CustomTabBarIcon';
import { ArticlesStackScreen } from '../../stacks/articlesStack/ArticlesStackScreen';
import { EventsStackScreen } from '../../stacks/eventsStack/EventsStackScreen';
import { HomeStackScreen } from '../../stacks/homeStack/HomeStackScreen';
import { ProfileStackScreen } from '../../stacks/profileStack/ProfileStackScreen';
import { RoutineStackScreen } from '../../stacks/routineStack/RoutineStackScreen';

// const Tab = createMaterialBottomTabNavigator();
const Tab2 = createBottomTabNavigator();

export const TabNavigatorProvider: FunctionComponent<PropsWithChildren> = () => {
    // const auth = useContext(AuthContext);

    // const theme = useTheme();
    // const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
    // const iconColor = theme.dark ? '#CB7E84' : '#8F4E73';
    const navigationTheme = DarkTheme;
    // const iconColor = '#b97a7f';
    const isIos = Platform.OS === 'ios';

    return (
        <NavigationContainer theme={navigationTheme}>
            <>
                <Tab2.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        // tabBarIconStyle: {},
                        tabBarActiveTintColor: '#b97a7f',
                        tabBarInactiveTintColor: 'rgba(4,115,171,0.8)',
                        tabBarStyle: {
                            position: 'absolute',
                            height: isIos ? 80 : 65,
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                            elevation: 0,
                            shadowOpacity: 0,
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
                    }}
                    // tabBar={(props) => <TabBar {...props} />}
                    initialRouteName="HomeTab"
                >
                    <Tab2.Screen
                        name="HomeTab"
                        component={HomeStackScreen}
                        options={{
                            tabBarLabel: 'Домой',
                            tabBarIcon: ({ focused, color }) => (
                                <CustomTabBarIcon iconName="home" focused={focused} color={color} />
                            ),
                        }}
                    />
                    <Tab2.Screen
                        name="CoursesTab"
                        component={ArticlesStackScreen}
                        options={{
                            tabBarLabel: 'Статьи',
                            tabBarIcon: ({ focused, color }) => (
                                <CustomTabBarIcon iconName="book" focused={focused} color={color} />
                            ),
                        }}
                    />
                    <Tab2.Screen
                        name="RoutineTab"
                        component={RoutineStackScreen}
                        options={() => ({
                            tabBarLabel: 'Йожить',
                            tabBarIcon: ({ focused, color }) => (
                                <CustomTabBarIcon iconName="yoga" focused={focused} color={color} />
                            ),
                        })}
                    />
                    <Tab2.Screen
                        name="EventsTab"
                        component={EventsStackScreen}
                        options={{
                            tabBarLabel: 'События',
                            tabBarIcon: ({ focused, color }) => (
                                <CustomTabBarIcon iconName="hexagon-multiple-outline" focused={focused} color={color} />
                            ),
                        }}
                    />
                    <Tab2.Screen
                        name="ProfileTab"
                        component={ProfileStackScreen}
                        options={{
                            tabBarLabel: 'Профиль',
                            tabBarIcon: ({ focused, color }) => (
                                <CustomTabBarIcon iconName="account" focused={focused} color={color} />
                            ),
                        }}
                    />
                </Tab2.Navigator>
            </>
        </NavigationContainer>
    );
};
