import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

import { LikeArticle } from '@/features/likeArticle';

import { screenHeight } from '@/shared/constants/screenSize';
import { useAppSelector } from '@/shared/lib/redux';
import { ArticlesScreen } from '@/shared/routing/NavigationEntities';
import { Spacer } from '@/shared/ui/components';
import { CommonLayout } from '@/shared/ui/layouts';

import styles from './ArticlePageStylesheet';


type Props = NativeStackScreenProps<RootStackParamList, ArticlesScreen.ARTICLE>;
// @ts-ignore
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const IMG_HEIGHT = (screenHeight / 100) * 70;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const ArticlePage: FunctionComponent<Props> = ({ route }) => {
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

    const articleId = route.params.articleId;
    const article = useAppSelector((state) => state.articleState.articles?.find((article) => article.id === articleId));
    const likedIds = useAppSelector((state) => state.articleState.likedArticleIds);
    const isLiked = Boolean(articleId && likedIds?.includes(articleId));

    if (!article) {
        console.warn(`article is undefined, articleId=${articleId}`);
        // log sentry
        return (
            <View>
                <Text variant="displayMedium">Что то пошло не так! Статьи не существует</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingBottom: bottomTabBarHeight }]}>
            <AnimatedScrollView ref={scrollRef} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                <AnimatedFastImage
                    source={{ uri: article.imageUrl, priority: FastImage.priority.normal }}
                    style={[styles.image, imageAnimatedStyle]}
                />

                <CommonLayout externalStyles={styles.textContainer}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title} variant="headlineSmall">
                            {article.title}
                        </Text>

                        <LikeArticle liked={isLiked} articleId={articleId} />
                    </View>
                    <Spacer size={20} />
                    <Text variant="bodyLarge">{article.content}</Text>
                </CommonLayout>
            </AnimatedScrollView>
        </View>
    );
};
