import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';

import ProfileWrapper from '../../../shared/ui/layouts/profile/ProfileWrapper';

const SupportPage = () => {
    return (
        <ProfileWrapper showBackButton>
            <View>
                <Title>Поддержка</Title>
            </View>
        </ProfileWrapper>
    );
};

export default SupportPage;
