import { Formik, FormikConfig } from 'formik';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import styles from './ProfileSettingsStylesheet';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { fetchProfileDB } from '@/entities/user/model';
import { AvatarComponent } from '@/entities/user/ui';
import { supaBaseApi } from '@/shared/api';
import { Spacer } from '@/shared/ui/components/Spacer';
import CommonLayout from '@/shared/ui/layouts/CommonLayout';
import { useAppTheme } from '@/app/providers/MaterialThemeProvider';
import { UserSex } from '@/shared/api/supaBase/models';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

const ProfileSettings = () => {
    const theme = useAppTheme();
    const dispatch = useAppDispatch();
    const session = useAppSelector((state) => state.userState.session);
    const profile = useAppSelector((state) => state.userState.profile);
    const [sexPickerValue, setSexPickerValue] = React.useState(() => (profile ? profile.sex : null));
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleUpdatePhoto = (url: string) => {
        if (session && profile) {
            // eslint-disable-next-line camelcase
            supaBaseApi.user
                .updateProfileDB(session, { ...profile, id: session.user.id, avatar_url: url })
                .then(() => dispatch(fetchProfileDB(session)));
        }
    };

    const formik: FormikConfig<{ email: string; userName: string }> = {
        enableReinitialize: true,
        initialValues: {
            email: profile?.email ?? '',
            userName: profile?.username ?? '',
        },

        onSubmit: async (values) => {
            const { userName } = values;
            setIsLoading(true);
            try {
                if (session && profile) {
                    supaBaseApi.user
                        .updateProfileDB(session, {
                            ...profile,
                            id: session.user.id,
                            sex: sexPickerValue,
                            username: userName,
                        })
                        .then(() => dispatch(fetchProfileDB(session)).then(() => setIsLoading(false)));
                }
            } catch (error) {
                if (error instanceof Error) {
                    const errorMessage = error.message;
                    Alert.alert(errorMessage);
                }
            }
        },
    };

    if (!profile) {
        return (
            <CommonLayout>
                <Text>Что-то пошло не так. Профиль не загрузился</Text>
            </CommonLayout>
        );
    }

    return (
        <CommonLayout>
            <View style={styles.avatar}>
                <AvatarComponent url={profile.avatar_url} onUpload={(url) => handleUpdatePhoto(url)} />
            </View>
            <Spacer size={20} />
            <View>
                <Formik {...formik}>
                    {({ handleChange, handleBlur, handleSubmit, values: { email, userName }, errors }) => (
                        <View style={styles.formContainer}>
                            <TextInput
                                disabled
                                mode="outlined"
                                autoCapitalize="none"
                                label="Адресс эл. почты"
                                value={email}
                                onBlur={handleBlur('email')}
                                onChangeText={handleChange('email')}
                                error={Boolean(errors.email)}
                                outlineStyle={{ borderColor: '#848484' }}
                            />
                            <TextInput
                                outlineStyle={{ borderColor: '#848484' }}
                                disabled={isLoading}
                                mode="outlined"
                                autoCapitalize="none"
                                label="Имя пользователя"
                                value={userName}
                                onBlur={handleBlur('userName')}
                                onChangeText={handleChange('userName')}
                                error={Boolean(errors.userName)}
                            />

                            <View>
                                <RNPickerSelect
                                    useNativeAndroidPickerStyle={false}
                                    style={{
                                        inputAndroidContainer: {
                                            backgroundColor: theme.dark ? '#1D1D22' : '#FEFBFF',
                                            borderWidth: 0.8,
                                            borderRadius: 5,
                                            borderColor: '#848484',
                                            padding: 10,
                                        },
                                        modalViewMiddle: {
                                            backgroundColor: '#fff',
                                        },
                                        placeholder: {
                                            color: theme.dark ? '#d5d4d7' : '#616161',
                                        },
                                        inputAndroid: {
                                            color: theme.dark ? '#ecebee' : '#212121',
                                            fontSize: 16,
                                            opacity: isLoading ? 0.6 : 1,
                                        },
                                        iconContainer: {
                                            top: 10,
                                            right: 10,
                                        },
                                    }}
                                    fixAndroidTouchableBug
                                    darkTheme={theme.dark}
                                    value={sexPickerValue}
                                    disabled={isLoading}
                                    placeholder={{ label: 'Выберите ваш пол' }}
                                    onValueChange={(value) => {
                                        if (!value && profile?.sex) {
                                            setSexPickerValue(null);
                                        } else {
                                            setSexPickerValue(value as UserSex);
                                        }
                                    }}
                                    items={[
                                        { label: 'женский', value: UserSex.FEMALE },
                                        { label: 'мужской', value: UserSex.MALE },
                                    ]}
                                    Icon={() => <Ionicons name="md-arrow-down" size={24} color="gray" />}
                                />
                            </View>

                            <Button
                                buttonColor={theme.colors.colorLevel4}
                                dark={theme.dark}
                                mode="contained-tonal"
                                contentStyle={styles.button}
                                disabled={isLoading}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                onPress={handleSubmit}
                            >
                                Сохранить
                            </Button>
                        </View>
                    )}
                </Formik>
            </View>
        </CommonLayout>
    );
};

export default ProfileSettings;
