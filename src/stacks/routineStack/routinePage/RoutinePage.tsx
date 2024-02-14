import { AntDesign } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { ImageBackground, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

import styles from './RoutinePageStylesheet';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { courseModel } from '../../../entities/course';
import { ROUTINE_CARD } from '../../../shared/constants/resourses';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

export const RoutinePage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(courseModel.fetchAllCourses());
    }, [dispatch]);
    const courses = useAppSelector((state) => state.courseState.courses);
    const loadingStatus = useAppSelector((state) => state.courseState.coursesLoadingStatus);

    // const isLoading = loadingStatus === LoadingStatus.LOADING;
    // const isError = loadingStatus === LoadingStatus.FAILED;

    console.log(courses, loadingStatus);
    return (
        <CommonLayout externalStyles={styles.container}>
            <View style={styles.courses}>
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
                            <IconButton
                                mode="contained"
                                containerColor="#052B42"
                                icon={() => <AntDesign name="arrowright" size={20} color="#6383cb" />}
                                size={23}
                                onPress={() => console.log('Pressed')}
                            />
                        </View>
                    </ImageBackground>
                </Card>
            </View>
            <View>
                <Text>Активные курсы</Text>
            </View>
        </CommonLayout>
    );
};
