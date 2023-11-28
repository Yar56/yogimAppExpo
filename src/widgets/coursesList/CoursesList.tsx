import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { Course, CourseCard } from '../../entities/course/ui';

interface CoursesListProps {
    courses: Course[];
}
export const CoursesList: FunctionComponent<CoursesListProps> = ({ courses }) => {
    console.log(courses);
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
