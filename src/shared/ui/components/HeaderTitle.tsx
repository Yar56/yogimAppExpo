import React from 'react';
import { Image } from 'react-native';
import { Text } from 'react-native-paper';

import { LOGO } from '../../constants/resourses';

export const HeaderTitle = () => {
    return (
        <Text variant="headlineMedium" style={{ marginLeft: 110 }}>
            <Image source={LOGO} style={{ width: 100, height: 100 }} />
            Йожим
        </Text>
    );
};
