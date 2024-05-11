import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, Divider, List, Text } from 'react-native-paper';

import styles from './ProfilePageStylesheet';
import { useAppTheme } from '../../../app/providers/MaterialThemeProvider';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { fetchProfileDB } from '../../../entities/user/model';
import { AvatarComponent } from '../../../entities/user/ui';
import { supaBaseApi } from '../../../shared/api';
import { LoadingStatus } from '../../../shared/api/supaBase/models';
import { screenHeight } from '../../../shared/constants/screenSize';
import { ProfileScreen } from '../../../shared/routing/NavigationEntities';
import useAppNavigation from '../../../shared/routing/useAppNavigation';
import { Spacer } from '../../../shared/ui/components/Spacer';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

export const ProfilePage = () => {
    const theme = useAppTheme();

    const dispatch = useAppDispatch();
    const session = useAppSelector((state) => state.userState.session);
    const profile = useAppSelector((state) => state.userState.profile);
    const profileLoadingStatus = useAppSelector((state) => state.userState.profileLoadingStatus);

    useEffect(() => {
        if (!session) {
            // log sentry error
            throw new Error('Сессия не активна');
        }
        dispatch(fetchProfileDB(session));
    }, [dispatch, session]);

    const handleLogout = () => supaBaseApi.user.signOutUser();

    const navigation = useAppNavigation();

    if (profileLoadingStatus === LoadingStatus.LOADING) {
        return (
            <CommonLayout>
                <ActivityIndicator size="large" />
            </CommonLayout>
        );
    }

    if (profileLoadingStatus === LoadingStatus.FAILED || !profile) {
        return (
            <CommonLayout>
                <Text>Произошла ошибка при получении профиля! Пожалуйста смахните приложение.</Text>
            </CommonLayout>
        );
    }

    return (
        <CommonLayout>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    navigation.navigate(ProfileScreen.PROFILE_SETTINGS);
                }}
            >
                <View style={styles.head}>
                    <View style={styles.headInfo}>
                        <AvatarComponent url={profile.avatar_url} />
                        <View style={styles.userNameWrapper}>
                            <Text style={styles.userName} variant="titleLarge">
                                {profile.username}
                            </Text>
                            {profile.email && <Text variant="bodyLarge">{profile.email}</Text>}
                        </View>
                    </View>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={30}
                        color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel6}
                    />
                </View>
            </TouchableOpacity>

            <Spacer size={20} />
            <Divider bold />
            <View style={[styles.mainContainer, { height: screenHeight * 0.65 }]}>
                <View style={styles.listItemWrapper}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(ProfileScreen.INTENTIONS)}>
                        <List.Item
                            title="Мои намерения"
                            style={[styles.listItem, { backgroundColor: theme.colors.colorLevel4 }]}
                            right={() => (
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={30}
                                    color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel6}
                                />
                            )}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate(ProfileScreen.PROFILE_EVENTS)}
                    >
                        <List.Item
                            title="Ивенты"
                            style={[styles.listItem, { backgroundColor: theme.colors.colorLevel4 }]}
                            right={() => (
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={30}
                                    color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel6}
                                />
                            )}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(ProfileScreen.SUPPORT)}>
                        <List.Item
                            title="Поддержка"
                            style={[styles.listItem, { backgroundColor: theme.colors.colorLevel4 }]}
                            right={() => (
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={30}
                                    color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel6}
                                />
                            )}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(ProfileScreen.SCHEDULE)}>
                        <List.Item
                            title="Расписание уведомлений"
                            style={[styles.listItem, { backgroundColor: theme.colors.colorLevel4 }]}
                            right={() => (
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={30}
                                    color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel6}
                                />
                            )}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(ProfileScreen.PAYMENT)}>
                        <List.Item
                            title="Оплата"
                            style={[styles.listItem, { backgroundColor: theme.colors.colorLevel4 }]}
                            right={() => (
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={30}
                                    color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel6}
                                />
                            )}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(ProfileScreen.PREMIUM)}>
                        <List.Item
                            title="Премиум (Личное ведение)"
                            style={[styles.listItem, { backgroundColor: theme.colors.colorLevel4 }]}
                            right={() => (
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={30}
                                    color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel6}
                                />
                            )}
                        />
                    </TouchableOpacity>
                </View>
                <Button
                    buttonColor={theme.colors.colorLevel4}
                    dark={theme.dark}
                    mode="contained-tonal"
                    onPress={handleLogout}
                >
                    Выйти
                </Button>
            </View>
        </CommonLayout>
    );
};
