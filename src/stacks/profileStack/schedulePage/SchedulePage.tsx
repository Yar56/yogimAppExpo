import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';

import ProfileWrapper from '../../../shared/ui/layouts/profile/ProfileWrapper';

const SchedulePage = () => {
    return (
        <ProfileWrapper showBackButton>
            <View>
                <Title>Расписание уведомлений</Title>
            </View>
        </ProfileWrapper>
    );
};

export default SchedulePage;
