import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Modal, Text } from 'react-native-paper';
import { EdgeInsets, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './CoursesPageStylesheet';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { courseModel } from '../../../entities/course';
import {
    COURSES_SCROLL_IMAGE_1,
    COURSES_SCROLL_IMAGE_2,
    COURSES_SCROLL_IMAGE_3,
} from '../../../shared/constants/resourses';
import { Spacer } from '../../../shared/ui/components/Spacer';
import { CoursesList } from '../../../widgets/coursesList/CoursesList';

export const CoursesPage = () => {
    const dispatch = useAppDispatch();
    const safeAreaInsets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        dispatch(courseModel.fetchAllCourses());
    }, []);

    const courses = useAppSelector((state) => state.courseState.courses);
    const loadingStatus = useAppSelector((state) => state.courseState.coursesLoadingStatus);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const scrollViewRef = useRef<ScrollView>(null);

    const handleOpenModal = (itemScrollId: string) => () => {
        showModal();
    };

    return (
        <LinearGradient colors={['#21244A', '#736688', '#C37686']} style={{ flex: 1 }}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <SafeAreaView edges={['bottom', 'top']} style={styles.container}>
                    <View>
                        <Text variant="headlineMedium">Курсы</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle} variant="titleLarge">
                            Прежде чем начать
                        </Text>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            ref={scrollViewRef}
                            horizontal
                            style={styles.scrollView}
                            contentContainerStyle={styles.scrollViewContentContainer}
                        >
                            <TouchableOpacity activeOpacity={0.5} style={[styles.card]} onPress={handleOpenModal('1')}>
                                <Card>
                                    <Card.Cover source={COURSES_SCROLL_IMAGE_3} />
                                </Card>
                                <Text variant="labelLarge">Часто задавыемые вопросы</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.5} style={[styles.card]} onPress={handleOpenModal('2')}>
                                <Card>
                                    <Card.Cover source={COURSES_SCROLL_IMAGE_2} />
                                </Card>
                                <Text variant="labelLarge">Первые шаги</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} style={[styles.card]} onPress={handleOpenModal('3')}>
                                <Card>
                                    <Card.Cover source={COURSES_SCROLL_IMAGE_1} />
                                </Card>
                                <Text variant="labelLarge">Основы</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <Spacer size={30} />
                    <CoursesList loadingStatus={loadingStatus} courses={courses} />
                    <Spacer size={160} />
                </SafeAreaView>
            </ScrollView>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                style={stylesModal(safeAreaInsets).modal}
                contentContainerStyle={{ flex: 1 }}
            >
                <Text onPress={hideModal} style={stylesModal(safeAreaInsets).modalText}>
                    Закрыть
                </Text>
                <Text>id</Text>
            </Modal>
        </LinearGradient>
    );
};

const stylesModal = (safeAreaInsets: EdgeInsets) =>
    StyleSheet.create({
        modal: {
            position: 'absolute',
            top: safeAreaInsets.top - 20,
            // bottom: safeAreaInsets.bottom,
            display: 'flex',
            left: safeAreaInsets.left - 10,
            right: safeAreaInsets.right - 10,
            backgroundColor: 'white',
            padding: 20,
            margin: 20,
            borderRadius: 10,
        },
        modalText: {
            textAlign: 'right',
            color: 'black',
        },
    });
