import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

import styles from './ArticlePageStylesheet';
import { useAppSelector } from '../../../app/store/hooks';
import { screenHeight } from '../../../shared/constants/screenSize';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

type Props = NativeStackScreenProps<RootStackParamList, 'Article'>;

const IMG_HEIGHT = (screenHeight / 100) * 70;

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
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <Animated.Image source={{ uri: article.imageUrl }} style={[styles.image, imageAnimatedStyle]} />

                <CommonLayout externalStyles={styles.textContainer}>
                    <Text variant="headlineSmall">{article.title}</Text>
                    <Text variant="bodyLarge">{article.content}</Text>
                </CommonLayout>
            </Animated.ScrollView>
        </View>
    );
};
