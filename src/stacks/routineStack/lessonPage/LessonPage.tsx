import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { Lesson } from '@/shared/api/supaBase';
import { useAppSelector } from '@/shared/lib/redux';
import { RoutineScreen } from '@/shared/routing/NavigationEntities';
import useAppNavigation from '@/shared/routing/useAppNavigation';
import { Direction, Loader, NavigateLessonsButton, Spacer } from '@/shared/ui/components/';
import { CommonLayout } from '@/shared/ui/layouts';

import { getHashedFileName } from './lib';

type Props = NativeStackScreenProps<RootStackParamList, RoutineScreen.LESSON>;

const NEXT_BUTTON_BLOCK_HEIGHT = 40;

export const LessonPage: FunctionComponent<Props> = ({ route }) => {
    const navigation = useAppNavigation();
    const courseId = route.params.courseId;
    const lessonId = route.params.lessonId;
    const bottomTabBarHeight = useBottomTabBarHeight();
    const [isVideoError, setIsVideoError] = useState<boolean>(false);
    const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
    const [videoUri, setVideoUri] = useState<string | null>(null);

    const video = useRef<Video | null>(null);

    const course = useAppSelector((state) => state.courseState.courses?.find((course) => course.id === courseId));
    const lessons = course?.lessons as unknown as Lesson[];
    const lesson = lessons.find((lesson) => lesson.id === lessonId);

    const lessonIds = lessons?.map((lesson) => lesson.id);

    useEffect(() => {
        const cacheVideo = async () => {
            const videoUrl = lesson?.videoUrl;
            if (!videoUrl) {
                return;
            }

            setIsVideoLoading(true);
            setIsVideoError(false);

            const fileName = await getHashedFileName(videoUrl);
            const filePath = `${FileSystem.documentDirectory}${fileName}`;

            try {
                const fileInfo = await FileSystem.getInfoAsync(filePath);

                if (fileInfo.exists) {
                    setVideoUri(fileInfo.uri);
                } else {
                    setIsVideoLoading(true);
                    await FileSystem.downloadAsync(videoUrl, filePath);
                    const newFileInfo = await FileSystem.getInfoAsync(filePath);
                    setVideoUri(newFileInfo.uri);
                }
            } catch (error) {
                console.error('Error caching video', error);
                setIsVideoError(true);
            } finally {
                setIsVideoLoading(false);
            }
        };

        cacheVideo();
    }, [lesson?.videoUrl]);

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
                navigation.navigate(RoutineScreen.LESSON, { courseId: course.id, lessonId: lessonIds[indexDirection] }); // переходим к нему
            }
        },
        [course?.id, lessonId, lessonIds, navigation]
    );

    if (!lesson || !lessonId || !lessonIds) {
        console.warn(`lesson is undefined, lessonId=${lessonId}`);
        return (
            <View>
                <Text variant="displayMedium">Что то пошло не так! Урока не существует</Text>
            </View>
        );
    }

    const content = isVideoError ? (
        <Text>Произошла ошибка при загрузке видео</Text>
    ) : (
        <Video
            key={lessonId}
            ref={video}
            style={styles.video}
            source={{
                uri: videoUri ?? lesson.videoUrl,
            }}
            useNativeControls
            isMuted
            resizeMode="cover"
            isLooping
            onLoadStart={() => setIsVideoLoading(true)}
            onLoad={() => setIsVideoLoading(false)}
            onError={() => setIsVideoError(true)}
            usePoster
            PosterComponent={(props) => {
                return isVideoLoading ? <Loader style={props.style} /> : null;
            }}
        />
    );

    return (
        <CommonLayout>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentInset={{ bottom: bottomTabBarHeight + NEXT_BUTTON_BLOCK_HEIGHT, ...styles.scrollView }}
            >
                <Text variant="titleLarge">{lesson.title}</Text>
                <Spacer size={20} />
                <Card style={styles.card}>{content}</Card>
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

const styles = StyleSheet.create({
    scrollView: {
        top: 0,
        right: 0,
        left: 0,
    },
    card: {
        width: 'auto',
        height: 250,
    },
    video: {
        width: 'auto',
        height: 250,
        borderRadius: 12,
    },
    posterWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
});
