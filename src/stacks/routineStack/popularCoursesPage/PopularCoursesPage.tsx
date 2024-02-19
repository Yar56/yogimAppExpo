import isEmpty from 'lodash-es/isEmpty';
import { useEffect } from 'react';
import React, { ListRenderItemInfo } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';

import styles from './PopularCoursesPageStylesheet';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { courseModel } from '../../../entities/course';
import { CourseCard } from '../../../entities/course/ui';
import { supaBaseApi } from '../../../shared/api';
import { Course, LoadingStatus } from '../../../shared/api/supaBase/models';
import FlatListComponent from '../../../shared/ui/components/flatListComponent/FlatListComponent';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

const PopularCoursesPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(courseModel.fetchAllCourses());
    }, [dispatch]);

    const courses = useAppSelector((state) => state.courseState.courses);
    const loadingStatus = useAppSelector((state) => state.courseState.coursesLoadingStatus);
    const coursesByType = useAppSelector((state) => state.courseState.coursesByType);

    const isLoading = loadingStatus === LoadingStatus.LOADING;
    const isError = loadingStatus === LoadingStatus.FAILED;

    const renderItem = ({ item }: ListRenderItemInfo<supaBaseApi.models.Course>) => {
        return <CourseCard course={item} />;
    };
    console.log(coursesByType);
    return (
        <CommonLayout externalStyles={styles.container}>
            {isLoading ? (
                <ActivityIndicator
                    style={{
                        marginTop: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size="large"
                    animating
                    color="#635096"
                />
            ) : (
                <TabsProvider defaultIndex={0}>
                    <Tabs
                        mode="scrollable"
                        showLeadingSpace={false}
                        style={{
                            backgroundColor: 'transparent',
                            marginHorizontal: 14,
                            overflow: 'visible',
                            marginBottom: 15,
                            marginTop: 10,
                        }}
                    >
                        {isError && !isLoading && isEmpty(courses) && (
                            <Text>Произошла ошибка, пожалуйста потяните экран вниз чтобы обновить данные</Text>
                        )}
                        <TabScreen label="Все">
                            <FlatListComponent<Course> items={courses || []} renderItem={renderItem} />
                        </TabScreen>
                        <TabScreen label="Йога">
                            <FlatListComponent items={coursesByType?.YOGA || []} renderItem={renderItem} />
                        </TabScreen>
                        <TabScreen label="Восстановление">
                            <FlatListComponent items={coursesByType?.RECOVERY || []} renderItem={renderItem} />
                        </TabScreen>
                        <TabScreen label="Медитации">
                            <FlatListComponent items={coursesByType?.MEDITATION || []} renderItem={renderItem} />
                        </TabScreen>
                    </Tabs>
                </TabsProvider>
            )}
        </CommonLayout>
    );
};

export default PopularCoursesPage;
