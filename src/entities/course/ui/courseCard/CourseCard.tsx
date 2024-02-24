import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import styles from './CourseCardStylesheet';
import { supaBaseApi } from '../../../../shared/api';

interface CourseCardProps {
    course: supaBaseApi.models.Course;
}
export const CourseCard: FunctionComponent<CourseCardProps> = ({ course }) => {
    const navigation = useNavigation();
    const handleCoursePage = () => navigation.navigate('Course', { courseId: course.id });

    return (
        <Card style={[styles.card, course.disabled && styles.cardDisabled]}>
            <Card.Cover
                source={{ uri: course.photoUrl }}
                style={{ flex: 1, height: 200, width: 'auto', resizeMode: 'stretch' }}
            />

            <Card.Title title={course.title} titleVariant="titleLarge" />
            <Card.Content>
                <Text variant="titleMedium">{course.description}</Text>
            </Card.Content>
            <View style={styles.infoWrapper}>
                <View style={styles.icons}>
                    <View style={styles.iconItem}>
                        <MaterialCommunityIcons name="text" size={30} color="#156494" />
                        <Text variant="bodyMedium">{course.lessonNumber}</Text>
                    </View>

                    <View style={styles.iconItem}>
                        <MaterialCommunityIcons name="clock" size={30} color="#156494" />
                        <Text variant="bodyMedium">{course.time}</Text>
                    </View>
                </View>

                <View>
                    <TouchableOpacity activeOpacity={0.5} onPress={handleCoursePage}>
                        <Button mode="contained-tonal" dark buttonColor="#156494">
                            {course.disabled ? 'Скоро' : 'Подробнее'}
                        </Button>
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );
};
