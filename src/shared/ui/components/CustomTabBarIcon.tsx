import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { IconProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

interface CustomTabBarIconProps {
    iconName: IconProps['name'];
    color: string;
}
export const CustomTabBarIcon: FunctionComponent<CustomTabBarIconProps> = ({ iconName, color }) => {
    return (
        <View>
            {/* @ts-ignore */}
            <MaterialCommunityIcons name={iconName} color={color} size={25} />
        </View>
    );
};
