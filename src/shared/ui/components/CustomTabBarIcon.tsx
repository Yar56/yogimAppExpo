import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { IconProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

interface CustomTabBarIconProps {
    iconName: IconProps['name'];
    focused: boolean;
    color: string;
}
const CustomTabBarIcon: FunctionComponent<CustomTabBarIconProps> = ({ iconName, focused, color }) => {
    return (
        <View
            style={{
                position: 'relative',
            }}
        >
            {/* @ts-ignore */}
            <MaterialCommunityIcons name={iconName} color={color} size={25} />
            {focused && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: -10,
                        left: 2,
                        width: '20%',
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,

                        borderBottomWidth: 5,
                        borderBottomColor: color,
                    }}
                />
            )}
        </View>
    );
};

export default CustomTabBarIcon;
