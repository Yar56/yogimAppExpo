import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { ImageBackground, ScrollView, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './ProfileWrapperStylesheet';
import { PROFILE_BACKGROUND_DARK } from '../../../constants/resourses';

interface ProfileWrapper {
    externalStyles?: ViewStyle;
    showBackButton?: boolean;
}
export const ProfileWrapper: FunctionComponent<ProfileWrapper & PropsWithChildren> = ({
    children,
    externalStyles,
    showBackButton: isShowBackButton,
}) => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            // source={theme === 'light' ? PROFILE_BACKGROUND_LIGHT : PROFILE_BACKGROUND_DARK}
            source={PROFILE_BACKGROUND_DARK}
            style={styles.backgroundContainer}
            imageStyle={styles.backgroundImage}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView edges={['bottom', 'top']} style={{ ...styles.container, ...externalStyles }}>
                    {isShowBackButton && (
                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                            <View style={styles.backButtonContainer}>
                                <MaterialCommunityIcons name="chevron-left" size={25} color="#F0FAFB" />
                                <Text>Назад</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    {children}
                </SafeAreaView>
            </ScrollView>
        </ImageBackground>
    );
};

export default ProfileWrapper;
