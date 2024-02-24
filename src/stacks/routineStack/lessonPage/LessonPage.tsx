import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

import styles from './LessonPageStylesheet';
import { useAppSelector } from '../../../app/store/hooks';
import { Lesson } from '../../../shared/api/supaBase/models';
import { screenHeight } from '../../../shared/constants/screenSize';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

const IMG_HEIGHT = (screenHeight / 100) * 70;
const LessonPage: FunctionComponent<Props> = ({ route }) => {
    const courseId = route.params.courseId;
    const lessonId = route.params.lessonId;

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const bottomTabBarHeight = useBottomTabBarHeight();
    const imageAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
        );
        const scale = interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1.2]);

        return {
            transform: [{ translateY }, { scale }],
        };
    });

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
    return (
        <View style={[styles.container, { paddingBottom: bottomTabBarHeight }]}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <Animated.Image source={{ uri: lesson.photoUrl }} style={[styles.image, imageAnimatedStyle]} />

                <CommonLayout externalStyles={{}} />
            </Animated.ScrollView>
        </View>
    );
};

export default LessonPage;
