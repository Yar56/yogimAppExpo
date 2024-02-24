import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FunctionComponent } from 'react';
import React, { TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import styles from './LessonCardStylesheet';
import { Lesson } from '../../../../shared/api/supaBase/models';

interface LessonCardProps {
    lesson: Lesson;
    index: number;
}
export const LessonCard: FunctionComponent<LessonCardProps> = ({ lesson, index }) => {
    const navigation = useNavigation();
    const handleGoToLesson = () => {
        console.log({ courseId: lesson.courseId, lessonId: lesson.id });
        navigation.navigate('Lesson', { courseId: lesson.courseId, lessonId: lesson.id });
    };

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handleGoToLesson}>
            <Card contentStyle={styles.card}>
                <Card.Cover
                    source={{ uri: lesson.photoUrl }}
                    style={{ flex: 1, height: 100, minWidth: 150, maxWidth: 150, resizeMode: 'stretch' }}
                />

                <View style={styles.info}>
                    <Text variant="titleLarge">Урок {index + 1}</Text>
                    <Text variant="bodyLarge" style={{ maxWidth: 170 }}>
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
