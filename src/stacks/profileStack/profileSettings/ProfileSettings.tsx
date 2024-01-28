import { Formik, FormikConfig } from 'formik';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as yup from 'yup';

import { useAppSelector } from '../../../app/store/hooks';
import { AvatarComponent } from '../../../entities/user/ui';
import { supaBaseApi } from '../../../shared/api';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';
import styles from '../../authStack/authPage/AuthStylesheet';

const schema = yup.object().shape({
    email: yup.string().email('Email некорректен').required('Заполните поле с email'),
    password: yup.string().required('Заполните поле с паролем').min(8, 'Пароль слишком короткий - минимум 8 символов'),
});

const ProfileSettings = () => {
    const session = useAppSelector((state) => state.userState.session);
    const profile = useAppSelector((state) => state.userState.profile);

    // const user = useAppSelector((state) => state.userState.user);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>('');

    const handleUpdatePhoto = (url: string) => {
        if (session) {
            supaBaseApi.user.updateProfileDB(session, { id: session.user.id, avatar_url: url });
        }
    };

    const formik: FormikConfig<{ email: string }> = {
        initialValues: {
            email: '',
        },
        validationSchema: schema,
        onSubmit: async (values, { resetForm }) => {
            const { email } = values;
            setIsLoading(true);

            try {
                // const response = await dispatch(userModel.signInUserThunk({ email, password }));
                // const payload = response.payload as AuthTokenResponse | undefined;
                // console.log(payload, 'AuthPage');
                // if (payload?.error?.message && payload.error.message.length !== 0) {
                //     throw payload?.error;
                // }
            } catch (error) {
                if (error instanceof Error) {
                    const errorMessage = error.message;
                    Alert.alert(errorMessage);
                }

                // const typedError = error as FirebaseError;
                // if (typedError.message === AuthErrorMessages.EMAIL_NOT_FOUND) {
                //     setApiError('Такого email не существует');
                // } else if (typedError.message === AuthErrorMessages.INVALID_PASSWORD) {
                //     setApiError('Неверный пароль');
                // } else if (typedError.message === AuthErrorMessages.USER_DISABLED) {
                //     setApiError('Юзер был отключен');
                // } else {
                //     setApiError('Непредвиденная ошибка!');
                //     console.error('Unknown Error', error);
                // }
            } finally {
                setIsLoading(false);
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
            <View>
                <AvatarComponent url={profile.avatar_url} onUpload={(url) => handleUpdatePhoto(url)} />
            </View>
            <View>
                <Formik {...formik}>
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values: { email },
                        isSubmitting,
                        dirty,
                        isValid,
                        errors,
                    }) => (
                        <View style={styles.formContainer}>
                            <TextInput
                                disabled={isSubmitting}
                                mode="outlined"
                                autoCapitalize="none"
                                label="Адресс эл. почты"
                                value={email}
                                onBlur={handleBlur('email')}
                                onChangeText={handleChange('email')}
                                error={Boolean(errors.email)}
                            />

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
                                    Войти
                                </Text>
                            </Button>
                            {apiError && !dirty && isValid && <div style={styles.errorText}>{apiError}</div>}
                        </View>
                    )}
                </Formik>
            </View>
        </CommonLayout>
    );
};

export default ProfileSettings;
