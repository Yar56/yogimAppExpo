import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
        <Card style={{ backgroundColor: '#022b42' }}>
            <Card.Cover
                source={{ uri: article.imageUrl }}
                // resizeMode="cover"
                style={{ flex: 1, height: 250, width: 'auto', resizeMode: 'stretch' }}
            />

            <View style={styles.buttons}>
                <Text variant="bodyLarge" style={{ maxWidth: 170 }}>
                    {article.title}
                </Text>
                <TouchableOpacity activeOpacity={0.5} onPress={handleMoveToArticle}>
                    <Button
                        icon={() => <AntDesign name="right" size={23} color="#6383cb" style={{ paddingLeft: 10 }} />}
                        mode="contained-tonal"
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        dark
                        buttonColor="#004e74"
                    >
                        Подробнее
                    </Button>
                </TouchableOpacity>
            </View>
        </Card>
    );
};
