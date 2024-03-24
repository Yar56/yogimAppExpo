import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik, FormikConfig } from 'formik';
import React from 'react';
import { Alert, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import styles from './ProfileSettingsStylesheet';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { fetchProfileDB } from '../../../entities/user/model';
import { AvatarComponent } from '../../../entities/user/ui';
import { supaBaseApi } from '../../../shared/api';
import { Spacer } from '../../../shared/ui/components/Spacer';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

const ProfileSettings = () => {
    const dispatch = useAppDispatch();
    const session = useAppSelector((state) => state.userState.session);
    const profile = useAppSelector((state) => state.userState.profile);

    const handleUpdatePhoto = (url: string) => {
        if (session && profile) {
            // eslint-disable-next-line camelcase
            supaBaseApi.user.updateProfileDB(session, { ...profile, id: session.user.id, avatar_url: url });
        }
    };

    const formik: FormikConfig<{ email: string; userName: string; sex: string }> = {
        enableReinitialize: true,
        initialValues: {
            email: profile?.email ?? '',
            userName: profile?.username ?? '',
            sex: profile?.sex ?? '',
        },

        onSubmit: async (values, { resetForm }) => {
            const { userName, sex } = values;

            try {
                if (session && profile) {
                    supaBaseApi.user
                        .updateProfileDB(session, { ...profile, id: session.user.id, sex, username: userName })
                        .then(() => dispatch(fetchProfileDB(session)));
                }
            } catch (error) {
                if (error instanceof Error) {
                    const errorMessage = error.message;
                    Alert.alert(errorMessage);
                }
            } finally {
                resetForm();
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
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values: { email, userName, sex },
                        isSubmitting,
                        dirty,
                        isValid,
                        errors,
                    }) => (
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
                            />
                            <TextInput
                                disabled={isSubmitting}
                                mode="outlined"
                                autoCapitalize="none"
                                label="Имя пользователя"
                                value={userName}
                                onBlur={handleBlur('userName')}
                                onChangeText={handleChange('userName')}
                                error={Boolean(errors.userName)}
                            />
                            <TextInput
                                disabled={isSubmitting}
                                mode="outlined"
                                autoCapitalize="none"
                                label="Пол"
                                value={sex}
                                onBlur={handleBlur('sex')}
                                onChangeText={handleChange('sex')}
                                error={Boolean(errors.sex)}
                            />
                            <View style={styles.authType}>
                                <View>
                                    <Text>Способ входа</Text>
                                </View>
                                <View>
                                    <MaterialCommunityIcons name="email-outline" size={25} color="#186DA4" />
                                </View>
                            </View>
                            <Button
                                contentStyle={styles.button}
                                buttonColor="#f3f2f2"
                                mode="contained"
                                disabled={isSubmitting}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                onPress={handleSubmit}
                            >
                                <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: '#111C1E' }}>
                                    Сохранить
                                </Text>
                            </Button>
                            {/*{apiError && !dirty && isValid && <div style={styles.errorText}>{apiError}</div>}*/}
                        </View>
                    )}
                </Formik>
            </View>
        </CommonLayout>
    );
};

export default ProfileSettings;
