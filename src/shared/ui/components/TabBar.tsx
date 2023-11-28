import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Spacer } from './Spacer';

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
        <View style={[styles.tabBar, styles.shadow]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                          ? options.title
                          : route.name;

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const icon = options.tabBarIcon();

                const isRoutineTab = route.name === 'RoutineTab';

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={`${options.tabBarTestID}_${Math.random()}`}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[styles.touch, isRoutineTab && styles.routine]}
                    >
                        <View>{icon}</View>
                        <Spacer size={5} />
                        <Text style={styles.text}>{label as string}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        position: 'absolute',
        bottom: 20,
        elevation: 0,
        height: 90,
        borderRadius: 15,
        right: 10,
        left: 10,
        backgroundColor: '#2C2831',
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    text: {
        color: '#A5A3AC',
    },
    touch: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    routine: {
        position: 'relative',
        right: -5,
        top: -20,
        backgroundColor: 'rgba(104,81,126,0.84)',
        padding: 10,
        borderRadius: 20,
    },
});
