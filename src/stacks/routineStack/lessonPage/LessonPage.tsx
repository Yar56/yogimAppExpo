import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Image from 'react-native-image-progress';
import { ActivityIndicator, Card, Text } from 'react-native-paper';

import { useAppSelector } from '../../../app/store/hooks';
import { Lesson } from '../../../shared/api/supaBase/models';
import { Spacer } from '../../../shared/ui/components/Spacer';
import NavigateLessonsButton, {
    Direction,
} from '../../../shared/ui/components/navigateLessonsButton/NavigateLessonsButton';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

const NEXT_BUTTON_BLOCK_HEIGHT = 40;

const LessonPage: FunctionComponent<Props> = ({ route }) => {
    const navigation = useNavigation();
    const courseId = route.params.courseId;
    const lessonId = route.params.lessonId;
    const bottomTabBarHeight = useBottomTabBarHeight();
    const [isVideoError, setIsVideoError] = useState<boolean>(false);

    useEffect(() => {
        if (!courseId || !lessonId) {
            console.error('courseId of lessonId is empty');
        }
        // dispatch(lessonModel.fetchAllLessonsByCourseId(courseId));
    }, [courseId]);
    const course = useAppSelector((state) => state.courseState.courses?.find((course) => course.id === courseId));
    const lessons = course?.lessons as unknown as Lesson[];
    const lesson = lessons.find((lesson) => lesson.id === lessonId);

    const lessonIds = lessons?.map((lesson) => lesson.id);

    const handleMoveToNextLesson = useCallback(
        (direction: Direction) => {
            if (!lessonIds) {
                return;
            }

            const currentLinkIndex = lessonIds.findIndex((link) => link === lessonId);

            // если есть следующий урок или движемся обратно
            if (currentLinkIndex + 1 < lessonIds.length || direction === Direction.PREVIOUS) {
                const indexDirection = direction === Direction.NEXT ? currentLinkIndex + 1 : currentLinkIndex - 1;
                // @ts-ignore
                navigation.navigate('Lesson', { courseId: course.id, lessonId: lessonIds[indexDirection] }); // переходим к нему
            }
        },
        [lessonId]
    );

    if (!lesson || !lessonId) {
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentInset={{ bottom: bottomTabBarHeight + NEXT_BUTTON_BLOCK_HEIGHT, top: 0, right: 0, left: 0 }}
            >
                <Text variant="titleLarge">{lesson.title}</Text>
                <Spacer size={20} />
                <Card style={{ width: 'auto', height: 250 }}>{content}</Card>
                <Spacer size={20} />
                <Text variant="bodyLarge">{lesson.description}</Text>
            </ScrollView>
            <NavigateLessonsButton
                lessonIds={lessonIds}
                onChangeLesson={handleMoveToNextLesson}
                currentLessonId={lessonId}
            />
        </CommonLayout>
    );
};

export default LessonPage;
