import React, { FunctionComponent } from 'react';
import { Card, Text } from 'react-native-paper';
import { Article } from '../../../../../shared/api/supaBase/models';
import LikeArticle from '../../../../../features/likeArticle/ui/LikeArticle';
import { StyleSheet } from 'react-native';

interface ProfileArticleCardProps {
    article: Article;
    likedIds?: string[];
}
const ProfileArticleCard: FunctionComponent<ProfileArticleCardProps> = ({ article, likedIds }) => {
    const isLiked = Boolean(article.id && likedIds?.includes(article.id));

    return (
        <Card>
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
