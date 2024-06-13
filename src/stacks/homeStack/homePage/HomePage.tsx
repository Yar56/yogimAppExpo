import { AntDesign } from '@expo/vector-icons';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

import styles from './HomePageStylesheet';
import MeditationList from './components/meditationList/MeditationList';
import { useAppTheme } from '../../../app/providers/MaterialThemeProvider';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { courseModel } from '../../../entities/course';
import { meditationModel } from '../../../entities/meditation';
import { PROFILE_DEFAULT_AVATAR, WELCOME_CARD_WOMEN } from '../../../shared/constants/resourses';
import getCurrentHours from '../../../shared/lib/date/getCurrentHours';
import getGreeting from '../../../shared/lib/message/getGreeting';
import { ProfileScreen, RoutineScreen, TabName } from '../../../shared/routing/NavigationEntities';
import useAppNavigation from '../../../shared/routing/useAppNavigation';
import { Spacer } from '../../../shared/ui/components/Spacer';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

// const SUGGEST_COURSE_ID = '6aff9f2d-c7e1-4acc-9865-bc57b2099a1e';
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
            // log sentry error
            throw new Error('Сессия не активна');
        }
        dispatch(courseModel.fetchAllCourses());
        dispatch(meditationModel.fetchAllMeditations());
    }, [dispatch, session]);

    const currentHours = useMemo(() => getCurrentHours(), []);

    const handleMoveToSuggestCourse = () => {
        navigation.navigate(TabName.ROUTINE_TAB, {
            screen: RoutineScreen.POPULAR_COURSES,
            // params: { courseId: SUGGEST_COURSE_ID },
        });
    };

    const handleMoveSettings = () => navigation.navigate(TabName.PROFILE_TAB, { screen: ProfileScreen.PROFILE });

    return (
        <CommonLayout edges={['top', 'bottom']}>
            <ScrollView contentContainerStyle={{ paddingBottom: 90 }} showsVerticalScrollIndicator={false}>
                <View style={styles.head}>
                    <View>
                        {profile?.avatar_url ? (
                            <Avatar.Image
                                size={avatarSize.width}
                                source={{ uri: profile?.avatar_url }}
                                accessibilityLabel="Avatar"
                                style={[avatarSize]}
                            />
                        ) : (
                            <Avatar.Image source={PROFILE_DEFAULT_AVATAR} />
                        )}
                    </View>
                    <View style={styles.greetingWrapper}>
                        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                            {getGreeting(currentHours)}
                            {profile?.username ? `, ${profile.username}` : ''}
                        </Text>
                        <Text variant="titleMedium">У тебя все получится!</Text>
                    </View>
                    <View style={styles.settings}>
                        <TouchableOpacity activeOpacity={0.5} onPress={handleMoveSettings}>
                            <AntDesign name="setting" size={23} color={theme.dark ? '#F1F5F9' : '#000'} />
                        </TouchableOpacity>
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
                    <MeditationList list={meditations} />
                </View>
            </ScrollView>
        </CommonLayout>
    );
};
