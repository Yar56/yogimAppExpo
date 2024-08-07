import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button, Card, Text } from 'react-native-paper';

import { Course } from '@/shared/api/supaBase';
import { useAppTheme } from '@/shared/lib/theme';
import { RoutineScreen } from '@/shared/routing/NavigationEntities';
import useAppNavigation from '@/shared/routing/useAppNavigation';

import styles from './CourseCardStylesheet';

interface CourseCardProps {
    course: Course;
}
export const CourseCard: FunctionComponent<CourseCardProps> = ({ course }) => {
    const theme = useAppTheme();
    const navigation = useAppNavigation();
    const handleCoursePage = () => navigation.navigate(RoutineScreen.COURSE, { courseId: course.id });

    return (
        <Card
            style={[
                styles.card,
                course.disabled && styles.cardDisabled,
                { backgroundColor: theme.dark ? '#022b42' : theme.colors.colorLevel3 },
            ]}
        >
            <FastImage
                style={styles.fastImage}
                source={{
                    uri: course.photoUrl,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />

            <Card.Title title={course.title} titleVariant="titleLarge" />
            <Card.Content>
                <Text variant="titleMedium">{course.description}</Text>
            </Card.Content>
            <View style={styles.infoWrapper}>
                <View style={styles.icons}>
                    <View style={styles.iconItem}>
                        <MaterialCommunityIcons
                            name="text"
                            size={30}
                            color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel4}
                        />
                        <Text variant="bodyMedium">{course.lessonNumber}</Text>
                    </View>

                    <View style={styles.iconItem}>
                        <MaterialCommunityIcons
                            name="clock"
                            size={30}
                            color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel4}
                        />
                        <Text variant="bodyMedium">{course.time}</Text>
                    </View>
                </View>

                <View>
                    <TouchableOpacity activeOpacity={0.5} onPress={handleCoursePage}>
                        <Button
                            mode="contained-tonal"
                            dark={theme.dark}
                            buttonColor={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel4}
                        >
                            {course.disabled ? 'Скоро' : 'Начать'}
                        </Button>
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );
};
