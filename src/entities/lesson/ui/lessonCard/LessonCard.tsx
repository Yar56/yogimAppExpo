import { AntDesign } from '@expo/vector-icons';
import { FunctionComponent } from 'react';
import React, { TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { Lesson } from '@/shared/api/supaBase';
import { useAppTheme } from '@/shared/lib/theme';
import { RoutineScreen } from '@/shared/routing/NavigationEntities';
import useAppNavigation from '@/shared/routing/useAppNavigation';

import styles from './LessonCardStylesheet';

interface LessonCardProps {
    lesson: Lesson;
    index: number;
}
export const LessonCard: FunctionComponent<LessonCardProps> = ({ lesson, index }) => {
    const theme = useAppTheme();
    const navigation = useAppNavigation();
    const handleGoToLesson = () => {
        navigation.navigate(RoutineScreen.LESSON, { courseId: lesson.courseId, lessonId: lesson.id });
    };

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handleGoToLesson}>
            <Card
                contentStyle={[
                    styles.card,
                    { backgroundColor: theme.dark ? theme.colors.colorLevel5 : theme.colors.colorLevel3 },
                ]}
            >
                <Card.Cover source={{ uri: lesson.photoUrl }} style={styles.cardCover} />

                <View style={styles.info}>
                    <Text variant="titleLarge">Урок {index + 1}</Text>
                    <Text variant="bodyLarge" style={styles.title}>
                        {lesson.title}
                    </Text>
                </View>
                <View style={[styles.icon, { backgroundColor: theme.colors.colorLevel4 }]}>
                    <AntDesign
                        name="right"
                        size={23}
                        color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel6}
                    />
                </View>
            </Card>
        </TouchableOpacity>
    );
};
