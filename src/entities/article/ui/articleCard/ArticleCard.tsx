import { AntDesign } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button, Card, Text } from 'react-native-paper';

import styles from './ArticleCardStylesheet';
import { useAppTheme } from '@/shared/lib/theme';
import { Article } from '@/shared/api/supaBase';
import { ArticlesScreen } from '@/shared/routing/NavigationEntities';
import useAppNavigation from '@/shared/routing/useAppNavigation';

interface CourseCardProps {
    article: Article;
}

export const ArticleCard: FunctionComponent<CourseCardProps> = ({ article }) => {
    const theme = useAppTheme();
    const navigation = useAppNavigation();
    const handleMoveToArticle = () => navigation.navigate(ArticlesScreen.ARTICLE, { articleId: article.id });

    return (
        <Card style={{ backgroundColor: theme.dark ? '#022b42' : theme.colors.colorLevel3 }}>
            <FastImage
                style={styles.fastImage}
                source={{
                    uri: article.imageUrl,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />

            <View style={styles.buttons}>
                <Text variant="bodyLarge" style={{ maxWidth: 170 }}>
                    {article.title}
                </Text>
                <TouchableOpacity activeOpacity={0.5} onPress={handleMoveToArticle} style={{ maxWidth: 130 }}>
                    <Button
                        icon={() => (
                            <AntDesign
                                name="right"
                                size={23}
                                color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel6}
                            />
                        )}
                        mode="contained-tonal"
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        dark={theme.dark}
                        buttonColor={theme.colors.colorLevel4}
                    >
                        Подробнее
                    </Button>
                </TouchableOpacity>
            </View>
        </Card>
    );
};
