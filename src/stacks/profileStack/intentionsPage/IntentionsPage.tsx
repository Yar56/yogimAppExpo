import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';

import ProfileWrapper from '../../../shared/ui/layouts/profile/ProfileWrapper';

const IntentionsPage = () => {
    return (
        <ProfileWrapper showBackButton>
            <View>
                <Title>Мои намерения</Title>
            </View>
        </ProfileWrapper>
    );
};

export default IntentionsPage;
