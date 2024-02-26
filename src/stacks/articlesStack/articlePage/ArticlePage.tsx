import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Text } from 'react-native-paper';
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

import styles from './ArticlePageStylesheet';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { articleModel } from '../../../entities/article';
import { screenHeight } from '../../../shared/constants/screenSize';
import { Spacer } from '../../../shared/ui/components/Spacer';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

type Props = NativeStackScreenProps<RootStackParamList, 'Article'>;
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const IMG_HEIGHT = (screenHeight / 100) * 70;
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export const ArticlePage: FunctionComponent<Props> = ({ route }) => {
    const dispatch = useAppDispatch();
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

    const scale = useSharedValue(1);
    const [iconIsPressed, setIconIsPressed] = useState(isLiked);
    const [isLoadingLiked, setIsLoadingLiked] = useState<boolean>(false);

    const handleIconPress = async () => {
        setIsLoadingLiked(true);
        try {
            if (isLiked) {
                await dispatch(articleModel.deleteLikedArticleThunk({ articleId }));
            } else {
                await dispatch(articleModel.setLikedArticleThunk({ articleId }));
            }
        } catch (e) {
        } finally {
            setIsLoadingLiked(false);
        }
        setIconIsPressed((prevState) => !prevState);
        const currentScale = iconIsPressed ? -0.2 : 0.2;
        scale.value = withSpring(scale.value + currentScale);
    };

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
                <AnimatedFastImage
                    source={{ uri: article.imageUrl, priority: FastImage.priority.normal }}
                    style={[styles.image, imageAnimatedStyle]}
                />

                <CommonLayout externalStyles={styles.textContainer}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title} variant="headlineSmall">
                            {article.title}
                        </Text>

                        <TouchableOpacity style={styles.iconWrapper} activeOpacity={1} onPress={handleIconPress}>
                            <AnimatedIcon
                                name={isLiked ? 'heart' : 'heart-outline'}
                                size={30}
                                color="#6383cb"
                                style={[
                                    { paddingLeft: 10, transform: [{ scale }] },
                                    isLoadingLiked && { pointerEvents: 'none', opacity: 0.3 },
                                ]}
                            />
                            {isLoadingLiked && (
                                <View style={{ position: 'absolute', top: 9, right: 18 }}>
                                    <ActivityIndicator size={14} />
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    <Spacer size={20} />
                    <Text variant="bodyLarge">{article.content}</Text>
                </CommonLayout>
            </Animated.ScrollView>
        </View>
    );
};
