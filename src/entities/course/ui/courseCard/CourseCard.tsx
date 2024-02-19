import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import styles from './CourseCardStylesheet';
import { fireBaseApi } from '../../../../shared/api';
import { PRODUCT_CARD_1 } from '../../../../shared/constants/resourses';

interface CourseCardProps {
    course: fireBaseApi.models.Course;
}
export const CourseCard: FunctionComponent<CourseCardProps> = ({ course }) => {
    const navigation = useNavigation();
    const handleCoursePage = () => navigation.navigate('Course', { courseId: course.id });

    return (
        <Card style={[styles.card, course.disabled && styles.cardDisabled]} contentStyle={styles.cardContent}>
            <ImageBackground
                resizeMode="cover"
                blurRadius={4}
                style={styles.imageContainer}
                imageStyle={styles.image}
                source={PRODUCT_CARD_1}
            >
                <Card.Title title={course.title} titleVariant="titleLarge" />
                <Card.Content>
                    <Text variant="titleMedium">{course.description}</Text>
                </Card.Content>

                <View style={styles.buttons}>
                    <TouchableOpacity activeOpacity={0.5} onPress={handleCoursePage}>
                        <Button mode="contained-tonal" dark buttonColor="#156494">
                            {course.disabled ? 'Скоро' : 'Подробнее'}
                        </Button>
                    </TouchableOpacity>
                </View>

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
            </ImageBackground>
        </Card>
    );
};
