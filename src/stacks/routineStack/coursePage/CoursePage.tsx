import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { FunctionComponent, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './CoursePageStylesheet';
import LessonList from './components/lessonList/LessonList';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { lessonModel } from '../../../entities/lesson';
import { Spacer } from '../../../shared/ui/components/Spacer';

type Props = NativeStackScreenProps<RootStackParamList, 'Course'>;

export const CoursePage: FunctionComponent<Props> = ({ route }) => {
    const dispatch = useAppDispatch();
    // const safeAreaInsets = useSafeAreaInsets();
    const courseId = route.params.courseId;

    useEffect(() => {
        if (!courseId) {
            console.error('courseId is empty');
            return;
        }
        dispatch(lessonModel.fetchAllLessonsByCourseId(courseId));
    }, [courseId]);

    const navigation = useNavigation();
    const course = useAppSelector((state) => state.courseState.courses?.find((course) => course.id === courseId));

    const handleBack = () => navigation.goBack();

    return (
        <LinearGradient colors={['#21244A', '#736688', '#C37686']} style={{ flex: 1 }}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <SafeAreaView edges={['bottom', 'top']} style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity activeOpacity={0.5} onPress={handleBack}>
                            <View>
                                <FontAwesome5 name="long-arrow-alt-left" size={25} color="#E7E1E5" />
                            </View>
                        </TouchableOpacity>
                        <Spacer size={60} horizontal />
                        <View>
                            <Text variant="headlineMedium">{course?.title}</Text>
                        </View>
                    </View>
                    <Spacer size={20} />
                    <View style={styles.infoWrapper}>
                        <View>
                            <View style={styles.tutor}>
                                <Avatar.Icon size={30} icon="folder" />
                                <Spacer size={15} horizontal />
                                <View>
                                    <Text variant="titleLarge">Юлия</Text>
                                </View>
                            </View>
                            <Spacer size={10} />
                            <View style={styles.time}>
                                <Text variant="bodyLarge">15 часов</Text>
                                <Entypo name="dot-single" size={24} color="#E7E1E5" />
                                <Text variant="bodyLarge">20 уроков</Text>
                            </View>
                        </View>
                        <View style={styles.price}>
                            <Text variant="headlineSmall">1200Р</Text>
                        </View>
                    </View>
                    <Spacer size={20} />
                    <Button mode="contained">Вступить</Button>
                    <Spacer size={20} />
                    <LessonList />
                </SafeAreaView>
            </ScrollView>
        </LinearGradient>
    );
};
