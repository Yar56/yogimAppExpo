import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import React, { FunctionComponent, PropsWithChildren } from 'react';

import { TabBar } from '../../shared/ui/components/TabBar';
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
    const iconColor = '#b97a7f';

    return (
        <NavigationContainer theme={navigationTheme}>
            <>
                <Tab2.Navigator
                    screenOptions={{ headerShown: false }}
                    tabBar={(props) => <TabBar {...props} />}
                    initialRouteName="HomeTab"
                >
                    <Tab2.Screen
                        name="HomeTab"
                        component={HomeStackScreen}
                        options={{
                            tabBarLabel: 'Домой',
                            tabBarIcon: () => <MaterialCommunityIcons name="home" color={iconColor} size={25} />,
                        }}
                    />
                    <Tab2.Screen
                        name="CoursesTab"
                        component={ArticlesStackScreen}
                        options={{
                            tabBarLabel: 'Статьи',
                            tabBarIcon: () => {
                                return <MaterialCommunityIcons name="book" color={iconColor} size={25} />;
                            },
                        }}
                    />
                    <Tab2.Screen
                        name="RoutineTab"
                        component={RoutineStackScreen}
                        options={() => ({
                            tabBarLabel: 'Йожить',
                            tabBarIcon: () => {
                                return <MaterialCommunityIcons name="yoga" color={iconColor} size={25} />;
                            },
                            // tabBarButton: (props) => {
                            //     return <CustomTabBatButton {...props} onPress={() => console.log('wa')} />;
                            // },
                        })}
                    />
                    <Tab2.Screen
                        name="EventsTab"
                        component={EventsStackScreen}
                        options={{
                            tabBarLabel: 'События',
                            tabBarIcon: () => {
                                return (
                                    <MaterialCommunityIcons
                                        name="hexagon-multiple-outline"
                                        color={iconColor}
                                        size={25}
                                    />
                                );
                            },
                        }}
                    />
                    <Tab2.Screen
                        name="ProfileTab"
                        component={ProfileStackScreen}
                        options={{
                            tabBarLabel: 'Профиль',
                            tabBarIcon: () => <MaterialCommunityIcons name="account" color={iconColor} size={25} />,
                        }}
                    />
                </Tab2.Navigator>
            </>
        </NavigationContainer>
    );
};
