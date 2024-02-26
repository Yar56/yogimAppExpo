import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button, Chip, Divider, Text } from 'react-native-paper';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

import styles from './CoursePageStylesheet';
import LessonList from './components/lessonList/LessonList';
import { useAppSelector } from '../../../app/store/hooks';
import { CourseLabel } from '../../../shared/api/supaBase/models';
import { screenHeight } from '../../../shared/constants/screenSize';
import { Spacer } from '../../../shared/ui/components/Spacer';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
type Props = NativeStackScreenProps<RootStackParamList, 'Course'>;
const IMG_HEIGHT = (screenHeight / 100) * 70;
export const CoursePage: FunctionComponent<Props> = ({ route }) => {
    const navigation = useNavigation();
    // const dispatch = useAppDispatch();
    // const safeAreaInsets = useSafeAreaInsets();
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
    const navigateToDetails = () => navigation.navigate('CourseDetailsPage', { details: course.details });

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
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
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
                    <Text
                        style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
                        variant="bodyLarge"
                        onPress={navigateToDetails}
                    >
                        Подробнее
                    </Text>
                    <Spacer size={15} />
                    <View style={styles.purchaseWrapper}>
                        <Text variant="headlineSmall">Доступ к курсу</Text>
                        {course.isFree ? (
                            <Chip style={{ backgroundColor: '#156494' }} mode="flat">
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
                            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                                {(course.labels as unknown as CourseLabel[]).map((label) => {
                                    return (
                                        <Chip key={label.id} style={{ width: 'fit-content', display: 'flex' }}>
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
                    <LessonList lessons={course.lessons} />
                </CommonLayout>
            </Animated.ScrollView>
        </View>
    );
};
