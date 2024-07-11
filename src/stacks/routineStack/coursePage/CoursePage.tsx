import { FontAwesome5 } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button, Chip, Divider, Text } from 'react-native-paper';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

import styles from './CoursePageStylesheet';
import LessonList from './components/lessonList/LessonList';
import { useAppTheme } from '@/shared/lib/theme';
import { useAppSelector } from '@/shared/lib/redux';
import { CourseLabel, Lesson } from '@/shared/api/supaBase';
import { screenHeight, screenWidth } from '@/shared/constants/screenSize';
import { RoutineScreen } from '@/shared/routing/NavigationEntities';
import useAppNavigation from '@/shared/routing/useAppNavigation';
import { Spacer, ControlledTooltip } from '@/shared/ui/components';
import { CommonLayout } from '@/shared/ui/layouts';

// @ts-ignore
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
type Props = NativeStackScreenProps<RootStackParamList, RoutineScreen.COURSE>;
const IMG_HEIGHT = (screenHeight / 100) * 70;
export const CoursePage: FunctionComponent<Props> = ({ route }) => {
    const theme = useAppTheme();

    const navigation = useAppNavigation();
    const courseId = route.params.courseId;

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
        if (!courseId) {
            console.error('courseId is empty');
        }
        // dispatch(lessonModel.fetchAllLessonsByCourseId(courseId));
    }, [courseId]);

    const course = useAppSelector((state) => state.courseState.courses?.find((course) => course.id === courseId));

    const handleBuyCourse = () => {};
    const navigateToDetails = () =>
        navigation.navigate(RoutineScreen.COURSE_DETAILS_PAGE, { details: course?.details });

    if (!course) {
        console.warn(`article is undefined, courseId=${courseId}`);
        // log sentry
        return (
            <View>
                <Text variant="displayMedium">Что то пошло не так! Курса не существует</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingBottom: bottomTabBarHeight }]}>
            <AnimatedScrollView ref={scrollRef} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                <AnimatedFastImage
                    source={{ uri: course.photoUrl, priority: FastImage.priority.normal }}
                    style={[styles.image, imageAnimatedStyle]}
                />

                <CommonLayout externalStyles={styles.textContainer}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title} variant="headlineSmall">
                            {course.title}
                        </Text>
                    </View>
                    <Spacer size={20} />
                    <Text variant="bodyLarge">{course.description}</Text>
                    <Spacer size={10} />
                    <Text style={styles.more} variant="bodyLarge" onPress={navigateToDetails}>
                        Подробнее
                    </Text>
                    <Spacer size={15} />
                    <View style={styles.purchaseWrapper}>
                        <View style={styles.purchase}>
                            <Text variant="titleLarge">Доступ к курсу</Text>
                            <ControlledTooltip
                                popover={
                                    <Text>Это мини-курс. Чтобы начать его, просто перейдите к нужному уроку.</Text>
                                }
                                width={screenWidth - 40}
                                height={60}
                            >
                                <FontAwesome5 name="question-circle" size={20} color="#6383CB" />
                            </ControlledTooltip>
                        </View>

                        {course.isFree ? (
                            <Chip
                                style={{
                                    backgroundColor: theme.dark ? theme.colors.colorLevel2 : theme.colors.colorLevel4,
                                }}
                                mode="flat"
                            >
                                <Text variant="bodyLarge">Бесплатно</Text>
                            </Chip>
                        ) : (
                            <TouchableOpacity activeOpacity={0.5} onPress={handleBuyCourse}>
                                <Button mode="contained-tonal" dark buttonColor="#156494">
                                    {course.isPaid ? 'Уже куплено' : 'Купить курс'}
                                </Button>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Spacer size={15} />
                    <Divider bold />
                    <Spacer size={15} />
                    {course.labels && (
                        <View>
                            <View style={styles.labelsWrapper}>
                                {(course.labels as unknown as CourseLabel[]).map((label) => {
                                    return (
                                        <Chip
                                            key={label.id}
                                            style={{
                                                ...styles.chip,
                                                backgroundColor: theme.colors.colorLevel3,
                                            }}
                                        >
                                            {label?.name}
                                        </Chip>
                                    );
                                })}
                            </View>
                            <Spacer size={20} />
                            <Divider bold />
                        </View>
                    )}

                    <Text variant="headlineSmall">Список уроков</Text>
                    <Spacer size={10} />
                    <LessonList lessons={course.lessons as unknown as Lesson[]} />
                </CommonLayout>
            </AnimatedScrollView>
        </View>
    );
};
