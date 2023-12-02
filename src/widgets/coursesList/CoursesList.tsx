import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { CourseCard } from '../../entities/course/ui';
import { fireBaseApi } from '../../shared/api/';
import { screenHeight, screenWidth } from '../../shared/constants/screenSize';

const loadingStatuses = fireBaseApi.models.LoadingStatus;
interface CoursesListProps {
    courses?: fireBaseApi.models.CourseList;
    loadingStatus: fireBaseApi.models.LoadingStatus;
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
                <Text variant="displaySmall">
                    Во время загрузки курсов произошла ошибка! Пожалуйста смахните приложение
                </Text>
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
