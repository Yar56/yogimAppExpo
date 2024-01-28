import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, Divider, List, Text } from 'react-native-paper';

import styles from './ProfilePageStylesheet';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { fetchProfileDB } from '../../../entities/user/model';
import { AvatarComponent } from '../../../entities/user/ui';
import { supaBaseApi } from '../../../shared/api';
import { LoadingStatus } from '../../../shared/api/supaBase/models';
import { screenHeight } from '../../../shared/constants/screenSize';
import { Spacer } from '../../../shared/ui/components/Spacer';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

export const ProfilePage = () => {
    // const { theme, toggleTheme } = usePreferencesContext();

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
    }, []);

    const handleLogout = () => supaBaseApi.user.signOutUser();

    const navigation = useNavigation();

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
                    navigation.navigate('ProfileSettings');
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
                    <MaterialCommunityIcons name="chevron-right" size={30} color="#F0FAFB" />
                </View>
            </TouchableOpacity>

            <Spacer size={20} />
            <Divider bold />
            <View style={[styles.mainContainer, { height: screenHeight * 0.65 }]}>
                {/*{profile ? (*/}
                {/*    <>*/}
                {/*        <Card*/}
                {/*            mode="contained"*/}
                {/*            style={{*/}
                {/*                // backgroundColor: theme === 'dark' ? 'rgba(31,43,83,0.6)' : 'rgba(228,107,80, 0.5)',*/}
                {/*                backgroundColor: 'rgba(31,43,83,0.8)',*/}
                {/*                borderRadius: 20,*/}
                {/*                paddingHorizontal: 10,*/}
                {/*                paddingVertical: 10,*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <Card.Title title="Мои курсы" titleVariant="titleLarge" />*/}
                {/*            <Card.Content style={{ gap: 10 }}>*/}
                {/*                <View style={{ gap: 5 }}>*/}
                {/*                    <View*/}
                {/*                        style={{*/}
                {/*                            display: 'flex',*/}
                {/*                            flexDirection: 'row',*/}
                {/*                            justifyContent: 'space-between',*/}
                {/*                            alignItems: 'center',*/}
                {/*                        }}*/}
                {/*                    >*/}
                {/*                        <Text variant="titleMedium">Здоровый Сон</Text>*/}
                {/*                        <MaterialCommunityIcons*/}
                {/*                            name="information-outline"*/}
                {/*                            size={20}*/}
                {/*                            color={MD3Colors.primary80}*/}
                {/*                        />*/}
                {/*                    </View>*/}
                {/*                    <ProgressBar*/}
                {/*                        // progress={20}*/}
                {/*                        animatedValue={0.2}*/}
                {/*                        color={MD3Colors.primary80}*/}
                {/*                        style={{ borderRadius: 25 }}*/}
                {/*                    />*/}
                {/*                </View>*/}
                {/*            </Card.Content>*/}
                {/*            <Card.Actions style={{ marginTop: 30 }}>*/}
                {/*                <Button onPress={handleLogout} mode="contained">*/}
                {/*                    Выйти*/}
                {/*                </Button>*/}
                {/*            </Card.Actions>*/}
                {/*        </Card>*/}
                {/*    </>*/}
                {/*) : (*/}
                {/*    <>*/}
                {/*        <Card*/}
                {/*            style={{*/}
                {/*                // backgroundColor: theme === 'dark' ? 'rgba(31,43,83,0.6)' : 'rgba(228,107,80, 0.5)',*/}
                {/*                backgroundColor: 'rgba(31,43,83,0.4)',*/}
                {/*                borderRadius: 20,*/}
                {/*                paddingHorizontal: 10,*/}
                {/*                paddingVertical: 10,*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <Card.Content style={{ display: 'flex', gap: 10, alignItems: 'center' }}>*/}
                {/*                <Text variant="titleLarge">Присоединиться</Text>*/}
                {/*                <Text variant="bodyMedium" style={{ textAlign: 'center' }}>*/}
                {/*                    Войдите в свой аккаунт, чтобы сохранять прогресс по курсам*/}
                {/*                </Text>*/}
                {/*            </Card.Content>*/}
                {/*            <Card.Actions style={{ marginTop: 10 }}>*/}
                {/*                <Button onPress={() => navigation.navigate('Auth')}>Войти</Button>*/}
                {/*                <Button onPress={() => navigation.navigate('Registration')}>Зарегистрироваться</Button>*/}
                {/*            </Card.Actions>*/}
                {/*        </Card>*/}
                {/*    </>*/}
                {/*)}*/}
                <View style={styles.listItemWrapper}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Intentions')}>
                        <List.Item
                            title="Мои намерения"
                            style={styles.listItem}
                            right={() => <MaterialCommunityIcons name="chevron-right" size={30} color="#F0FAFB" />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('ProfileEvents')}>
                        <List.Item
                            title="Ивенты"
                            style={styles.listItem}
                            right={() => <MaterialCommunityIcons name="chevron-right" size={30} color="#F0FAFB" />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Support')}>
                        <List.Item
                            title="Поддержка"
                            style={styles.listItem}
                            right={() => <MaterialCommunityIcons name="chevron-right" size={30} color="#F0FAFB" />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Schedule')}>
                        <List.Item
                            title="Расписание уведомлений"
                            style={styles.listItem}
                            right={() => <MaterialCommunityIcons name="chevron-right" size={30} color="#F0FAFB" />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Payment')}>
                        <List.Item
                            title="Оплата"
                            style={styles.listItem}
                            right={() => <MaterialCommunityIcons name="chevron-right" size={30} color="#F0FAFB" />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Premium')}>
                        <List.Item
                            title="Премиум (Личное ведение)"
                            style={styles.listItem}
                            right={() => <MaterialCommunityIcons name="chevron-right" size={30} color="#F0FAFB" />}
                        />
                    </TouchableOpacity>
                </View>
                <Button contentStyle={styles.exitButton} mode="contained-tonal" onPress={handleLogout}>
                    Выйти
                </Button>
            </View>
        </CommonLayout>
    );
};
