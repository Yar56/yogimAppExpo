import { useNavigation } from '@react-navigation/native';
import { AuthTokenResponse } from '@supabase/supabase-js';
import { Formik, FormikConfig } from 'formik';
import React, { useState } from 'react';
import { Alert, ImageBackground, Platform, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';

import styles from './AuthStylesheet';
import { useAppDispatch } from '../../../app/store/hooks';
import { userModel } from '../../../entities/user';
import { PROFILE_BACKGROUND_DARK } from '../../../shared/constants/resourses';
import { LoadingWrapper } from '../../../shared/ui/layouts/loading/LoadingWrapper';
import commonStyles from '../registrationPage/RegistrationPageStylesheet';

const schema = yup.object().shape({
    email: yup.string().email('Email некорректен').required('Заполните поле с email'),
    password: yup.string().required('Заполните поле с паролем').min(8, 'Пароль слишком короткий - минимум 8 символов'),
});

export const AuthPage = () => {
    const isIos = Platform.OS === 'ios';

    const dispatch = useAppDispatch();

    // const { theme, toggleTheme } = usePreferencesContext();
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>('');

    const handleNavigateToSignUp = () => {
        navigation.navigate('Registration');
    };
    const handleRecoveryPage = () => {
        // todo
        // navigation.navigate('Profile');
    };

    const formik: FormikConfig<{ email: string; password: string }> = {
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: async (values, { resetForm }) => {
            const { email, password } = values;
            setIsLoading(true);

            try {
                const response = await dispatch(userModel.signInUserThunk({ email, password }));

                const payload = response.payload as AuthTokenResponse | undefined;
                console.log(payload, 'AuthPage');

                if (payload?.error?.message && payload.error.message.length !== 0) {
                    throw payload?.error;
                }

                console.log('to profile');
                navigation.navigate('ProfileTab', { screen: 'Profile' });
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

    return (
        <ImageBackground source={PROFILE_BACKGROUND_DARK} style={commonStyles.backgroundContainer}>
            <LoadingWrapper isLoading={isLoading}>
                <SafeAreaView
                    edges={['bottom', 'top']}
                    style={[styles.container, isLoading ? styles.containerLoading : null]}
                >
                    <View>
                        <Text style={styles.socialAuthTitle} variant="titleLarge">
                            Добро пожаловать в Йожим!
                        </Text>
                    </View>

                    <View style={styles.buttonsSocialAuth}>
                        {isIos ? (
                            <Button
                                buttonColor="#749cf3"
                                contentStyle={styles.button}
                                icon="apple"
                                mode="contained"
                                onPress={() => console.log('Pressed')}
                            >
                                <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: '#FAFFFF' }}>
                                    Войти с Apple
                                </Text>
                            </Button>
                        ) : (
                            <Button
                                buttonColor="#f3f2f2"
                                contentStyle={styles.button}
                                icon="google"
                                mode="contained"
                                onPress={() => console.log('Pressed')}
                            >
                                <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: '#111C1E' }}>
                                    Войти с Google
                                </Text>
                            </Button>
                        )}
                    </View>
                    <View>
                        <Text style={styles.emailText} variant="bodyLarge">
                            или по эл. почте
                        </Text>
                    </View>

                    <Formik {...formik}>
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values: { email, password },
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
                                <TextInput
                                    disabled={isSubmitting}
                                    mode="outlined"
                                    label="Пароль"
                                    secureTextEntry={secureTextEntry}
                                    right={
                                        <TextInput.Icon
                                            icon="eye"
                                            onPress={() => {
                                                setSecureTextEntry(!secureTextEntry);
                                                return false;
                                            }}
                                        />
                                    }
                                    value={password}
                                    onBlur={handleBlur('password')}
                                    onChangeText={handleChange('password')}
                                    error={Boolean(errors.password)}
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

                    <View style={styles.recoverPassContainer}>
                        <View style={styles.underlineWrapper}>
                            <Text style={styles.underlineText} onPress={handleRecoveryPage}>
                                Забыли пароль?
                            </Text>
                        </View>
                    </View>

                    <View style={styles.bottomCard}>
                        <View style={styles.bottomCardContent}>
                            <Text style={styles.bottomCardText}>Еще не с нами?</Text>
                            <View style={styles.underlineWrapper}>
                                <Text style={styles.underlineText} onPress={handleNavigateToSignUp}>
                                    Присоединиться
                                </Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LoadingWrapper>
        </ImageBackground>
    );
};
