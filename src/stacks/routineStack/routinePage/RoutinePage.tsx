import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import styles from './RoutinePageStylesheet';
import { ROUTINE_CARD } from '../../../shared/constants/resourses';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

export const RoutinePage = () => {
    const navigation = useNavigation();

    const handleNavigate = () => navigation.navigate('PopularCourses');

    return (
        <CommonLayout externalStyles={styles.container}>
            <View style={styles.courses}>
                <Card style={styles.card}>
                    <ImageBackground
                        resizeMode="cover"
                        blurRadius={7}
                        style={styles.imageContainer}
                        imageStyle={styles.image}
                        source={ROUTINE_CARD}
                    >
                        <View style={styles.controls}>
                            <Text variant="headlineSmall">Популярные курсы</Text>

                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={handleNavigate}
                                style={{
                                    backgroundColor: '#052B42',
                                    borderRadius: 50,
                                    padding: 6,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <AntDesign name="right" size={23} color="#6383cb" />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </Card>
            </View>
            <View>
                <Text>Активные курсы</Text>
            </View>
        </CommonLayout>
    );
};
