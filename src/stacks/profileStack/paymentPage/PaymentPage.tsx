import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';

import ProfileWrapper from '../../../shared/ui/layouts/profile/ProfileWrapper';

const PaymentPage = () => {
    return (
        <ProfileWrapper showBackButton>
            <View>
                <Title>Оплата</Title>
            </View>
        </ProfileWrapper>
    );
};

export default PaymentPage;
