import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { ActivityIndicator } from 'react-native-paper';
import { useAppDispatch } from '../../../app/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { articleModel } from '../../../entities/article';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

interface LikeArticleProps {
    liked: boolean;
    articleId?: string;
}
const LikeArticle: FunctionComponent<LikeArticleProps> = ({ liked: isLiked, articleId }) => {
    const dispatch = useAppDispatch();
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
        } catch (error) {
        } finally {
            setIsLoadingLiked(false);
        }
        setIconIsPressed((prevState) => !prevState);
        const currentScale = iconIsPressed ? -0.2 : 0.2;
        scale.value = withSpring(scale.value + currentScale);
    };

    return (
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
    );
};

const styles = StyleSheet.create({
    iconWrapper: {
        width: 50,
    },
});

export default LikeArticle;
