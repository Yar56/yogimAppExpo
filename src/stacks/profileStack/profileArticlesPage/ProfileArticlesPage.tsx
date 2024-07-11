import React, { useEffect } from 'react';
import { ActivityIndicator, Text, Title } from 'react-native-paper';

import { CommonLayout } from '@/shared/ui/layouts';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { LoadingStatus } from '@/shared/api/supaBase';
import { articleModel } from '@/entities/article';
import { StyleSheet, View } from 'react-native';
import { Spacer } from '@/shared/ui/components';
import ProfileArticleCard from './components/profileArticleCard/ProfileArticleCard';

export const ProfileArticlesPage = () => {
    const dispatch = useAppDispatch();
    const likedIds = useAppSelector((state) => state.articleState.likedArticleIds);

    useEffect(() => {
        if (!likedIds) {
            return;
        }
        dispatch(articleModel.fetchAllArticlesByIds(likedIds));
    }, [dispatch, likedIds]);

    const articles = useAppSelector((state) => state.articleState.likedArticles);
    const loadingStatus = useAppSelector((state) => state.articleState.articlesLoadingStatus);

    const isLoading = loadingStatus === LoadingStatus.LOADING;
    const isError = loadingStatus === LoadingStatus.FAILED;

    if (isLoading && !articles) {
        return (
            <CommonLayout>
                <Title>Мои статьи</Title>
                <Spacer size={20} />
                <ActivityIndicator size="large" />
            </CommonLayout>
        );
    }

    if (!isLoading && isError) {
        return (
            <CommonLayout>
                <Title>Мои статьи</Title>
                <Spacer size={20} />
                <Text variant="bodyLarge">Произошла ошибка при получении статей</Text>
            </CommonLayout>
        );
    }

    return (
        <CommonLayout>
            <Title>Мои статьи</Title>
            <Spacer size={20} />
            <View style={{ display: 'flex', gap: 10 }}>
                {articles && articles.length !== 0 ? (
                    articles?.map((article) => (
                        <ProfileArticleCard key={article.id} article={article} likedIds={likedIds} />
                    ))
                ) : (
                    <Text variant="bodyLarge" style={styles.infoBlock}>
                        Похоже у вас нет любимых статей
                    </Text>
                )}
            </View>
        </CommonLayout>
    );
};

const styles = StyleSheet.create({
    infoBlock: {
        marginTop: 20,
    },
    iconWrapper: {
        width: 50,
    },
});
