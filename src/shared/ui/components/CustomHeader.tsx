import { AntDesign } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { LOGO } from '../../constants/resourses';

interface CustomHeaderProps {
    headerProps: NativeStackHeaderProps;
}
const CustomHeader: FunctionComponent<CustomHeaderProps> = ({ headerProps }) => {
    const isTransparentPage = headerProps.route.name === 'Article' || headerProps.route.name === 'Course';

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 105,
                backgroundColor: isTransparentPage ? 'transparent' : '#022B42',
                paddingTop: 40,
                position: 'relative',
            }}
        >
            {headerProps.navigation.canGoBack() && headerProps.navigation.getState().index !== 0 && (
                <TouchableOpacity
                    style={{ position: 'absolute', left: 5, bottom: '25%' }}
                    onPress={() => {
                        headerProps.navigation.goBack();
                    }}
                >
                    <AntDesign name="left" size={25} color="#0b80ba" style={{ paddingLeft: 10 }} />
                </TouchableOpacity>
            )}
            {!isTransparentPage && (
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={LOGO} style={{ width: 70, height: 70, marginRight: 0 }} />
                    <Text variant="headlineSmall" onPress={() => headerProps.navigation.goBack()}>
                        Йожим
                    </Text>
                </View>
            )}
        </View>
    );
};

export default CustomHeader;
