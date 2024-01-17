import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './RoutinePageStylesheet';

export const RoutinePage = () => {
    return (
        <LinearGradient colors={['#000', '#000']} style={{ flex: 1 }}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <SafeAreaView edges={['bottom', 'top']} style={styles.container}>
                    <View>
                        <Text variant="headlineMedium">Рутина</Text>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </LinearGradient>
    );
};
