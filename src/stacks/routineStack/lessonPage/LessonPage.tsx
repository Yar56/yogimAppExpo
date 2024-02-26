import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { View } from 'react-native';
import Image from 'react-native-image-progress';
import { ActivityIndicator, Card, Text } from 'react-native-paper';

import { useAppSelector } from '../../../app/store/hooks';
import { Lesson } from '../../../shared/api/supaBase/models';
import { Spacer } from '../../../shared/ui/components/Spacer';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

const LessonPage: FunctionComponent<Props> = ({ route }) => {
    const courseId = route.params.courseId;
    const lessonId = route.params.lessonId;

    const [isVideoError, setIsVideoError] = useState<boolean>(false);

    useEffect(() => {
        if (!courseId || !lessonId) {
            console.error('courseId of lessonId is empty');
        }
        // dispatch(lessonModel.fetchAllLessonsByCourseId(courseId));
    }, [courseId]);
    const course = useAppSelector((state) => state.courseState.courses?.find((course) => course.id === courseId));
    const lesson = (course?.lessons as unknown as Lesson[]).find((lesson) => lesson.id === lessonId);

    if (!lesson) {
        console.warn(`lesson is undefined, lessonId=${lessonId}`);
        // log sentry
        return (
            <View>
                <Text variant="displayMedium">Что то пошло не так! Урока не существует</Text>
            </View>
        );
    }

    const content = isVideoError ? (
        <Text>Произошла ошибка при загрузке видео</Text>
    ) : (
        <Image
            source={{ uri: lesson.videoUrl }}
            indicator={() => <ActivityIndicator size={20} />}
            imageStyle={{ borderRadius: 15 }}
            style={{
                height: 250,
            }}
            onError={() => setIsVideoError(true)}
        />
    );

    return (
        <CommonLayout>
            <Text variant="titleLarge">{lesson.title}</Text>
            <Spacer size={20} />
            <Card style={{ width: 'auto', height: 250 }}>{content}</Card>
            <Spacer size={20} />
            <Text variant="bodyLarge">{lesson.description}</Text>
        </CommonLayout>
    );
};

export default LessonPage;
