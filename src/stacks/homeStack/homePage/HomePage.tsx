import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { courseModel } from '@/entities/course';
import { meditationModel } from '@/entities/meditation';
import { userUi } from '@/entities/user';

import { WELCOME_CARD_WOMEN } from '@/shared/constants/resourses';
import { getCurrentHours } from '@/shared/lib/date';
import { getGreeting } from '@/shared/lib/message';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { useAppTheme } from '@/shared/lib/theme';
import { RoutineScreen, TabName } from '@/shared/routing/NavigationEntities';
import useAppNavigation from '@/shared/routing/useAppNavigation';
import { Spacer } from '@/shared/ui/components';
import { CommonLayout } from '@/shared/ui/layouts';

import { MeditationListComponent } from './components/meditationList/MeditationList';
import styles from './HomePageStylesheet';

const { AvatarComponent } = userUi;

export const HomePage: FunctionComponent = () => {
    const session = useAppSelector((state) => state.userState.session);
    const dispatch = useAppDispatch();

    const theme = useAppTheme();

    const profile = useAppSelector((state) => state.userState.profile);
    const meditations = useAppSelector((state) => state.meditationState.meditations);
    const avatarSize = { height: 54, width: 54 };
    const navigation = useAppNavigation();

    useEffect(() => {
        if (!session) {
            throw new Error('Сессия не активна');
        }
        dispatch(courseModel.fetchAllCourses());
        dispatch(meditationModel.fetchAllMeditations());
    }, [dispatch, session]);

    const currentHours = useMemo(() => getCurrentHours(), []);

    const handleMoveToSuggestCourse = () => {
        navigation.navigate(TabName.ROUTINE_TAB, {
            screen: RoutineScreen.POPULAR_COURSES,
        });
    };

    return (
        <CommonLayout edges={['top', 'bottom']}>
            <ScrollView contentContainerStyle={{ paddingBottom: 90 }} showsVerticalScrollIndicator={false}>
                <View style={styles.head}>
                    <View>
                        <AvatarComponent url={profile?.avatar_url} size={avatarSize.width} />
                    </View>
                    <View style={styles.greetingWrapper}>
                        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                            {getGreeting(currentHours)}
                            {profile?.username ? `, ${profile.username}` : ''}
                        </Text>
                        <Text variant="titleMedium">У тебя все получится!</Text>
                    </View>
                </View>
                <Spacer size={20} />

                <Card style={[styles.card, { backgroundColor: theme.dark ? '#042B42' : '#D0E9FF' }]}>
                    <Image source={WELCOME_CARD_WOMEN} style={styles.cardImage} />

                    <View style={styles.controls}>
                        <Text variant="titleLarge">Готовы начать свой первый урок?</Text>
                        <Text variant="titleMedium">Мини курс для начинающих</Text>
                        <Button
                            mode="contained"
                            buttonColor={theme.dark ? theme.colors.colorLevel3 : theme.colors.colorLevel4}
                            dark={theme.dark}
                            onPress={handleMoveToSuggestCourse}
                        >
                            Начать
                        </Button>
                    </View>
                </Card>
                <Spacer size={20} />
                <View>
                    <View style={styles.recommendWrapper}>
                        <Text variant="titleLarge">Рекомендуем вам</Text>
                    </View>
                </View>
                <Spacer size={10} />
                <View style={{ height: 225 }}>
                    <MeditationListComponent list={meditations} />
                </View>
            </ScrollView>
        </CommonLayout>
    );
};
