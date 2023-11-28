import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';

import ProfileWrapper from '../../../shared/ui/layouts/profile/ProfileWrapper';

const SettingsPage = () => {
    return (
        <ProfileWrapper showBackButton>
            <View>
                <Title>Настройки</Title>
                {/*<TouchableRipple onPress={toggleTheme}>*/}
                {/*    <View style={styles.preference}>*/}
                {/*        <Text variant={'titleMedium'}>Сменить Тему</Text>*/}
                {/*        <View pointerEvents="none">*/}
                {/*            <Switch value={theme === 'dark'} />*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</TouchableRipple>*/}
            </View>
        </ProfileWrapper>
    );
};

export default SettingsPage;
