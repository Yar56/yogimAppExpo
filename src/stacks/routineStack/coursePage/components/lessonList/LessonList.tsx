import React from 'react';
import { FlatList, ListRenderItemInfo, ScrollView } from 'react-native';

import styles from './LessonListStylesheet';
import { useAppSelector } from '../../../../../app/store/hooks';
import LessonItem from '../lessonItem/LessonItem';

interface Lesson {
    id: string;
    title: string;
    description: string;
}

const LessonList = () => {
    const lessons = useAppSelector((state) => state.lessonState.lessonsByCourseId);

    const renderItem = ({ item }: ListRenderItemInfo<Lesson>) => {
        return <LessonItem lesson={item} />;
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
            <FlatList
                contentContainerStyle={styles.wrapper}
                data={lessons}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </ScrollView>
    );
};

export default LessonList;
