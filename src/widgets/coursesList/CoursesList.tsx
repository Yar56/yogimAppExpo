import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { courseUi } from '@/entities/course';
import { LoadingStatus, CourseList } from '@/shared/api/supaBase';
import { screenHeight, screenWidth } from '@/shared/constants/screenSize';

const { CourseCard } = courseUi;

const loadingStatuses = LoadingStatus;
interface CoursesListProps {
    courses?: CourseList;
    loadingStatus: LoadingStatus;
}
export const CoursesList: FunctionComponent<CoursesListProps> = ({ loadingStatus, courses }) => {
    if (loadingStatus === loadingStatuses.LOADING || !courses) {
        return (
            <ActivityIndicator
                style={{
                    position: 'absolute',
                    top: screenHeight / 2.3,
                    left: screenWidth / 2.3,
                    zIndex: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                size="large"
                animating
                color="#2D2D5B"
            />
        );
    }

    if (loadingStatus === loadingStatuses.FAILED) {
        return (
            <View>
                <Text variant="bodyLarge">
                    Во время загрузки курсов произошла ошибка! Пожалуйста смахните приложение
                </Text>
            </View>
        );
    }

    if (loadingStatus === loadingStatuses.SUCCEEDED && courses.length === 0) {
        return (
            <View>
                <Text variant="bodyLarge">Кажется курсы не загрузились! Пожалуйста смахните приложение</Text>
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>{courses?.map((course) => <CourseCard course={course} key={course.id} />)}</View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
});
