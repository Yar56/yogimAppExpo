import isEmpty from 'lodash-es/isEmpty';
import React, { useEffect } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';

import styles from './ArticlesPageStylesheet';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { articleModel } from '../../../entities/article';
import { ArticleCard } from '../../../entities/article/ui';
import { supaBaseApi } from '../../../shared/api';
import { LoadingStatus } from '../../../shared/api/fireBase/models';
import FlatListComponent from '../../../shared/ui/components/flatListComponent/FlatListComponent';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

export const ArticlesPage = () => {
    const dispatch = useAppDispatch();
    // const safeAreaInsets = useSafeAreaInsets();
    // const navigation = useNavigation();

    useEffect(() => {
        dispatch(articleModel.fetchAllArticles());
    }, []);

    const articlesByType = useAppSelector((state) => state.articleState.articleByType);
    const articles = useAppSelector((state) => state.articleState.articles);
    const loadingStatus = useAppSelector((state) => state.articleState.articlesLoadingStatus);

    const isLoading = loadingStatus === LoadingStatus.LOADING;
    const isError = loadingStatus === LoadingStatus.FAILED;

    // const scrollViewRef = useRef<ScrollView>(null);

    const renderItem = ({ item }: ListRenderItemInfo<supaBaseApi.models.Article>) => {
        return <ArticleCard article={item} />;
    };
    return (
        <CommonLayout externalStyles={styles.container}>
            <View style={styles.infoContainer}>
                <Text variant="headlineSmall">Полезные материалы</Text>
            </View>
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
                            marginBottom: 20,
                            marginTop: 10,
                        }}
                    >
                        {isError && !isLoading && isEmpty(articles) && (
                            <Text>Произошла ошибка, пожалуйста потяните экран вниз чтобы обновить данные</Text>
                        )}
                        <TabScreen label="Все">
                            <FlatListComponent items={articles || []} renderItem={renderItem} />
                        </TabScreen>
                        <TabScreen label="Йога и медитация">
                            <FlatListComponent items={articlesByType?.YOGA || []} renderItem={renderItem} />
                        </TabScreen>
                        <TabScreen label="Энергия">
                            <FlatListComponent items={articlesByType?.ENERGY || []} renderItem={renderItem} />
                        </TabScreen>
                    </Tabs>
                </TabsProvider>
            )}
        </CommonLayout>
    );
};
