import { AntDesign } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { LOGO } from '../../shared/constants/resourses';
import { articlesRoutes } from '../../shared/routing/routes';

const CoursesStack = createNativeStackNavigator<RootStackParamList>();

export const ArticlesStackScreen = () => {
    return (
        <CoursesStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: '#022B42' },
                header: (props) => {
                    return (
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 100,
                                backgroundColor: '#022B42',
                                paddingTop: 30,
                                position: 'relative',
                            }}
                        >
                            {props.navigation.canGoBack() && props.navigation.getState().index !== 0 && (
                                <TouchableOpacity
                                    style={{ position: 'absolute', left: 5, bottom: 25 }}
                                    onPress={() => {
                                        props.navigation.goBack();
                                    }}
                                >
                                    <AntDesign name="left" size={25} color="#006da4" style={{ paddingLeft: 10 }} />
                                </TouchableOpacity>
                            )}
                            <Image source={LOGO} style={{ width: 50, height: 50, marginRight: 20 }} />
                            <Text variant="headlineSmall" onPress={() => props.navigation.goBack()}>
                                Йожим
                            </Text>
                        </View>
                    );
                },
            }}
        >
            {articlesRoutes.map((route) => {
                return <CoursesStack.Screen options={{ title: route.title }} key={route.name} {...route} />;
            })}
        </CoursesStack.Navigator>
    );
};
