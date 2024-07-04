import React, { FunctionComponent } from 'react';
import { ListRenderItemInfo } from 'react-native';

import { lessonUi } from '@/entities/lesson';
import { Lesson } from '@/shared/api/supaBase/models';
import FlatListComponent from '@/shared/ui/components/flatListComponent/FlatListComponent';

const { LessonCard } = lessonUi;

interface LessonListProps {
    lessons: Lesson[];
}
const LessonList: FunctionComponent<LessonListProps> = ({ lessons }) => {
    // const lessons = useAppSelector((state) => state.lessonState.lessonsByCourseId);

    const renderItem = ({ item, index }: ListRenderItemInfo<Lesson>) => {
        return <LessonCard lesson={item} index={index} />;
    };

    return (
        <FlatListComponent<Lesson>
            withPadding={false}
            items={lessons ?? []}
            renderItem={renderItem}
            notFoundText="Уроки не найдены"
            scrollEnabled={false}
        />
    );
};

export default LessonList;
