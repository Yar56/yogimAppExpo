import isEmpty from 'lodash-es/isEmpty';
import { useEffect } from 'react';
import React, { ListRenderItemInfo } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import styles from './PopularCoursesPageStylesheet';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { courseModel, courseUi } from '@/entities/course';
import { Course, LoadingStatus } from '@/shared/api/supaBase';
import { FlatListComponent } from '@/shared/ui/components';
import { CommonLayout } from '@/shared/ui/layouts';

const { CourseCard } = courseUi;

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

    const renderItem = ({ item }: ListRenderItemInfo<Course>) => {
        return <CourseCard course={item} />;
    };

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
                            <FlatListComponent<Course>
                                items={courses || []}
                                renderItem={renderItem}
                                notFoundText="Курсы не найдены"
                            />
                        </TabScreen>
                        <TabScreen label="Йога">
                            <FlatListComponent
                                items={coursesByType?.YOGA || []}
                                renderItem={renderItem}
                                notFoundText="Курсы не найдены"
                            />
                        </TabScreen>
                        <TabScreen label="Восстановление">
                            <FlatListComponent
                                items={coursesByType?.RECOVERY || []}
                                renderItem={renderItem}
                                notFoundText="Курсы не найдены"
                            />
                        </TabScreen>
                        <TabScreen label="Медитации">
                            <FlatListComponent
                                items={coursesByType?.MEDITATION || []}
                                renderItem={renderItem}
                                notFoundText="Курсы не найдены"
                            />
                        </TabScreen>
                    </Tabs>
                </TabsProvider>
            )}
        </CommonLayout>
    );
};

export default PopularCoursesPage;
