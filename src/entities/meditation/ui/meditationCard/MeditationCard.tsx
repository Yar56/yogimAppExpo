import { AntDesign } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { ImageBackground, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { Meditation } from '@/shared/api/supaBase';
import { useAppTheme } from '@/shared/lib/theme';
import { HomeScreen } from '@/shared/routing/NavigationEntities';
import useAppNavigation from '@/shared/routing/useAppNavigation';
import { Spacer } from '@/shared/ui/components';

import styles from './MeditationCardStylesheet';

interface MeditationCardProps {
    meditation: Meditation;
}
export const MeditationCard: FunctionComponent<MeditationCardProps> = ({ meditation }) => {
    const navigation = useAppNavigation();
    const theme = useAppTheme();
    const handleClick = () => navigation.navigate(HomeScreen.MEDITATION, { meditationId: meditation.id });
    return (
        <Card style={styles.card} onPress={handleClick}>
            <ImageBackground
                source={{ uri: meditation.photoUrl ?? '' }}
                style={[styles.imageBackground, { backgroundColor: theme.dark ? '#605f5f' : theme.colors.colorLevel2 }]}
                imageStyle={[styles.imageBackgroundImage, { opacity: theme.dark ? 0.3 : 0.4 }]}
            />

            <View style={styles.cardView}>
                <Text variant="titleLarge" style={styles.text}>
                    {meditation.title}
                </Text>
                <Spacer size={7} />
                <View style={styles.time}>
                    <Text style={{ fontWeight: '600' }}>{meditation.time}</Text>
                    <AntDesign name="play" color={meditation.color} size={20} />
                </View>
            </View>
        </Card>
    );
};
