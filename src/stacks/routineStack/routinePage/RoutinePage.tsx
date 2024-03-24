import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card, Text, Tooltip } from 'react-native-paper';

import styles from './RoutinePageStylesheet';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { courseModel } from '../../../entities/course';
import { EMPTY_ACTIVE_COURSE, ROUTINE_CARD } from '../../../shared/constants/resourses';
import { RoutineScreen } from '../../../shared/routing/NavigationEntities';
import useAppNavigation from '../../../shared/routing/useAppNavigation';
import { Spacer } from '../../../shared/ui/components/Spacer';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

export const RoutinePage = () => {
    const dispatch = useAppDispatch();

    const navigation = useAppNavigation();
    const profile = useAppSelector((state) => state.userState.profile);
    const courses = useAppSelector((state) => state.courseState.courses);
    const activeCourse = courses && courses.find((course) => course.id === profile?.activeCourseId);

    useEffect(() => {
        dispatch(courseModel.fetchAllCourses());
    }, [dispatch]);

    const handleNavigate = () => navigation.navigate(RoutineScreen.POPULAR_COURSES);

    return (
        <CommonLayout externalStyles={styles.container}>
            <View>
                <Card style={styles.card}>
                    <ImageBackground
                        resizeMode="cover"
                        blurRadius={7}
                        style={styles.imageContainer}
                        imageStyle={styles.image}
                        source={ROUTINE_CARD}
                    >
                        <View style={styles.controls}>
                            <Text variant="headlineSmall">Популярные курсы</Text>

                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={handleNavigate}
                                style={{
                                    backgroundColor: '#052B42',
                                    borderRadius: 50,
                                    padding: 6,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <AntDesign name="right" size={23} color="#6383cb" />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </Card>
            </View>
            <Spacer size={20} />
            <View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'baseline',
                        gap: 5,
                    }}
                >
                    <Text variant="titleLarge">Активные курсы</Text>

                    <Tooltip title="Активный курс - тот курс в котором вы нажали Вступить. Обычно это курс длинною от нескольких дней до двух недель">
                        <FontAwesome5 name="question-circle" size={19} color="#6383CB" />
                    </Tooltip>
                </View>

                {!activeCourse && (
                    <View style={{ alignItems: 'center' }}>
                        <Spacer size={20} />
                        <Image
                            style={styles.emptyCourseImage}
                            source={EMPTY_ACTIVE_COURSE}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text style={{ textAlign: 'center' }} variant="headlineSmall">
                            Похоже активных курсов нет
                        </Text>
                        <Spacer size={10} />
                        <Text style={{ textAlign: 'center' }} variant="bodyLarge">
                            Выберете курс и начните его прохождения, чтобы он отобразился тут
                        </Text>
                    </View>
                )}
            </View>
        </CommonLayout>
    );
};
