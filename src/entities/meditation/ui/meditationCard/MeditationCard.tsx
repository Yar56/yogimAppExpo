import { AntDesign } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { ImageBackground, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import styles from './MeditationCardStylesheet';
import { supaBaseApi } from '../../../../shared/api';
import { HomeScreen } from '../../../../shared/routing/NavigationEntities';
import useAppNavigation from '../../../../shared/routing/useAppNavigation';
import { Spacer } from '../../../../shared/ui/components/Spacer';

interface MeditationCardProps {
    meditation: supaBaseApi.models.Meditation;
}
export const MeditationCard: FunctionComponent<MeditationCardProps> = ({ meditation }) => {
    const navigation = useAppNavigation();
    const handleClick = () => navigation.navigate(HomeScreen.MEDITATION, { meditationId: meditation.id });
    return (
        <Card style={styles.card} onPress={handleClick}>
            <ImageBackground
                source={{ uri: meditation.photoUrl ?? '' }}
                style={styles.imageBackground}
                imageStyle={styles.imageBackgroundImage}
            />

            <View style={styles.cardView}>
                <Text variant="titleLarge" style={styles.text}>
                    {meditation.title}
                </Text>
                <Spacer size={7} />
                <View style={styles.time}>
                    <Text>{meditation.time}</Text>
                    <AntDesign name="play" color={meditation.color} size={20} />
                </View>
            </View>
        </Card>
    );
};
