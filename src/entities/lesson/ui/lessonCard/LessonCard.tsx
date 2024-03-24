import { AntDesign } from '@expo/vector-icons';
import { FunctionComponent } from 'react';
import React, { TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import styles from './LessonCardStylesheet';
import { Lesson } from '../../../../shared/api/supaBase/models';
import { RoutineScreen } from '../../../../shared/routing/NavigationEntities';
import useAppNavigation from '../../../../shared/routing/useAppNavigation';

interface LessonCardProps {
    lesson: Lesson;
    index: number;
}
export const LessonCard: FunctionComponent<LessonCardProps> = ({ lesson, index }) => {
    const navigation = useAppNavigation();
    const handleGoToLesson = () => {
        navigation.navigate(RoutineScreen.LESSON, { courseId: lesson.courseId, lessonId: lesson.id });
    };

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handleGoToLesson}>
            <Card contentStyle={styles.card}>
                <Card.Cover source={{ uri: lesson.photoUrl }} style={styles.cardCover} />

                <View style={styles.info}>
                    <Text variant="titleLarge">Урок {index + 1}</Text>
                    <Text variant="bodyLarge" style={styles.title}>
                        {lesson.title}
                    </Text>
                </View>
                <View style={styles.icon}>
                    <AntDesign name="right" size={23} color="#6383cb" />
                </View>
            </Card>
        </TouchableOpacity>
    );
};
