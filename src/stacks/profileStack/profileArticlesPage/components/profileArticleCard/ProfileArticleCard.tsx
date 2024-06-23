import React, { FunctionComponent } from 'react';
import { Card, Text } from 'react-native-paper';
import { Article } from '../../../../../shared/api/supaBase/models';
import { StyleSheet } from 'react-native';
import { LikeArticle } from '../../../../../features/likeArticle';
import { useAppTheme } from '../../../../../app/providers/MaterialThemeProvider';

interface ProfileArticleCardProps {
    article: Article;
    likedIds?: string[];
}
const ProfileArticleCard: FunctionComponent<ProfileArticleCardProps> = ({ article, likedIds }) => {
    const isLiked = Boolean(article.id && likedIds?.includes(article.id));
    const theme = useAppTheme();

    return (
        <Card
            mode="elevated"
            style={{ backgroundColor: theme.dark ? theme.colors.colorLevel5 : theme.colors.colorLevel3 }}
        >
            <Card.Content style={styles.contentWrapper}>
                <Text variant="titleMedium">{article.title}</Text>
                <LikeArticle articleId={article.id} liked={isLiked} />
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    contentWrapper: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
export default ProfileArticleCard;
