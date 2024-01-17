import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import styles from './ArticleCardStylesheet';
import { supaBaseApi } from '../../../../shared/api';

interface CourseCardProps {
    article: supaBaseApi.models.Article;
}
export const ArticleCard: FunctionComponent<CourseCardProps> = ({ article }) => {
    const navigation = useNavigation();
    const handleMoveToArticle = () => navigation.navigate('Article', { articleId: article.id });

    return (
        <Card style={styles.card} contentStyle={styles.cardContent}>
            <ImageBackground
                resizeMode="cover"
                blurRadius={4}
                style={styles.imageContainer}
                imageStyle={styles.image}
                source={{ uri: article.imageUrl }}
            >
                <Card.Title title={article.title} titleVariant="titleLarge" />

                <View style={styles.buttons}>
                    <TouchableOpacity activeOpacity={0.5} onPress={handleMoveToArticle}>
                        <Button mode="contained-tonal" dark buttonColor="rgba(99, 89, 124, 0.7)">
                            Подробнее
                        </Button>
                    </TouchableOpacity>
                </View>

                <View style={styles.icons}>
                    <View style={styles.iconItem}>
                        <MaterialCommunityIcons name="clock" size={30} color="#A893BF" />
                        <Text variant="bodyMedium">{article.time}</Text>
                    </View>
                </View>
            </ImageBackground>
        </Card>
    );
};
