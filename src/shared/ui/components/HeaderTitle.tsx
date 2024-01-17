import React from 'react';
import { Image } from 'react-native';
import { Text } from 'react-native-paper';

import { LOGO } from '../../constants/resourses';

const HeaderTitle = () => {
    return (
        <Text variant="headlineMedium" style={{ marginLeft: 110 }}>
            <Image source={LOGO} style={{ width: 50, height: 50 }} />
            Йожим
        </Text>
    );
};

export default HeaderTitle;
