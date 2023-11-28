import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';

import ProfileWrapper from '../../../shared/ui/layouts/profile/ProfileWrapper';

const PremiumPage = () => {
    return (
        <ProfileWrapper showBackButton>
            <View>
                <Title>Премиум (Личное ведение)</Title>
            </View>
        </ProfileWrapper>
    );
};

export default PremiumPage;
