import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/src/styles/themes/v3/tokens';
import styles from './RoutinePageStylesheet';
import { useAppTheme } from '@/shared/lib/theme';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { courseModel } from '@/entities/course';
import { ROUTINE_CARD, ROUTINE_CARD_LIGHT } from '@/shared/constants/resourses';
import { RoutineScreen } from '@/shared/routing/NavigationEntities';
import useAppNavigation from '@/shared/routing/useAppNavigation';
import { Spacer, ControlledTooltip } from '@/shared/ui/components';
import { CommonLayout } from '@/shared/ui/layouts';
import { screenWidth } from '@/shared/constants/screenSize';

export const RoutinePage = () => {
    const theme = useAppTheme();
    const dispatch = useAppDispatch();

    const navigation = useAppNavigation();
    const profile = useAppSelector((state) => state.userState.profile);
    const courses = useAppSelector((state) => state.courseState.courses);
    const activeCourse = courses && courses.find((course) => course.id === profile?.activeCourseId);

    useEffect(() => {
        dispatch(courseModel.fetchAllCourses());
    }, [dispatch]);

    const handleNavigate = () => navigation.navigate(RoutineScreen.POPULAR_COURSES);

    const colorText = theme.dark ? MD3Colors.neutral90 : theme.colors.colorLevel0;

    return (
        <CommonLayout externalStyles={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View>
                    <Card style={styles.card}>
                        <ImageBackground
                            resizeMode="cover"
                            blurRadius={theme.dark ? 1 : 1}
                            style={styles.imageContainer}
                            imageStyle={[styles.image, { opacity: theme.dark ? 1 : 0.6 }]}
                            source={theme.dark ? ROUTINE_CARD : ROUTINE_CARD_LIGHT}
                        >
                            <View style={styles.controls}>
                                <Text
                                    style={{
                                        color: colorText,
                                        fontWeight: 'bold',
                                    }}
                                    variant="headlineSmall"
                                >
                                    Найдите свой баланс
                                </Text>
                                <Text
                                    style={{
                                        color: colorText,
                                        fontWeight: '600',
                                    }}
                                    variant="labelLarge"
                                >
                                    Откройте для себя занятия йогой для любого уровня.
                                </Text>
                                <TouchableOpacity
                                    style={styles.popularButton}
                                    activeOpacity={0.5}
                                    onPress={handleNavigate}
                                >
                                    <Button textColor={colorText} mode="text">
                                        Популярные курсы
                                    </Button>
                                    <AntDesign name="right" size={20} color={colorText} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </Card>
                </View>
                <Spacer size={20} />
                <View>
                    <View style={styles.infoCoursesWrapper}>
                        <Text variant="titleLarge">Активные курсы</Text>
                        <ControlledTooltip
                            popover={
                                <Text>
                                    Активный курс - это тот курс, на который вы подписались, нажав кнопку "Вступить".
                                    Обычно это курс, который длится от нескольких дней до двух недель.
                                </Text>
                            }
                            width={screenWidth - 40}
                            height={100}
                        >
                            <FontAwesome5 name="question-circle" size={19} color="#6383CB" />
                        </ControlledTooltip>
                    </View>

                    {!activeCourse && (
                        <View style={{ alignItems: 'center' }}>
                            <Spacer size={30} />
                            <Text style={styles.text} variant="headlineSmall">
                                Похоже активных курсов нет
                            </Text>
                            <Spacer size={10} />
                            <Text style={styles.text} variant="bodyLarge">
                                Выберете курс и начните его прохождения, чтобы он отобразился тут
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </CommonLayout>
    );
};
