import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';

import ProfileWrapper from '../../../shared/ui/layouts/profile/ProfileWrapper';

const ProfileEvents = () => {
    return (
        <ProfileWrapper showBackButton>
            <View>
                <Title>Прошедшие события</Title>
            </View>
        </ProfileWrapper>
    );
};

export default ProfileEvents;
