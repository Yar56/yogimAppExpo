import { useNavigation } from '@react-navigation/native';
import { AuthResponse } from '@supabase/supabase-js';
import { Formik, FormikConfig } from 'formik';
import React, { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';

import styles from './RegistrationPageStylesheet';
import { useAppDispatch } from '../../../app/store/hooks';
import { userModel } from '../../../entities/user';
import { PROFILE_BACKGROUND_DARK } from '../../../shared/constants/resourses';
import { LoadingWrapper } from '../../../shared/ui/layouts/loading/LoadingWrapper';
import authStyles from '../authPage/AuthStylesheet';

const schema = yup.object().shape({
    displayName: yup.string().required('Заполните имя пользователя'),
    email: yup.string().email('Email некорректен').required('Заполните поле с email'),
    password: yup.string().required('Заполните поле с паролем').min(8, 'Пароль слишком короткий - минимум 8 символов'),
    confirmPassword: yup
        .string()
        .required('Подтвердите пароль')
        .oneOf([yup.ref('password'), null], 'Пароли должны совподать'),
});

export const RegistrationPage = () => {
    const isIos = Platform.OS === 'ios';
    const dispatch = useAppDispatch();

    // const { theme, toggleTheme } = usePreferencesContext();

    const [secureTextEntryPass, setSecureTextEntryPass] = useState(true);
    const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);

    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>('');

    const formik: FormikConfig<{ displayName: string; email: string; password: string; confirmPassword: string }> = {
        initialValues: {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: schema,
        onSubmit: async (values, { resetForm }) => {
            const { displayName, email, password } = values;

            setIsLoading(true);

            try {
                const response = await dispatch(userModel.signUpUserThunk({ email, password, username: displayName }));
                const payload = response.payload as AuthResponse | undefined;

                if (payload?.error?.message && payload.error.message.length !== 0) {
                    console.error(payload?.error?.message);
                    throw payload?.error;
                }

                navigation.navigate('Profile');
                // dispatch(userModel.setCachedDisplayName(displayName));
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

    const handleNavigateToSignIn = () => {
        navigation.navigate('Auth');
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled style={{ flex: 1 }}>
            <ImageBackground source={PROFILE_BACKGROUND_DARK} style={styles.backgroundContainer}>
                <LoadingWrapper isLoading={isLoading}>
                    <SafeAreaView edges={['bottom', 'top']} style={styles.container}>
                        <View>
                            <Text style={authStyles.socialAuthTitle} variant="titleLarge">
                                Присоединиться
                            </Text>
                        </View>
                        <View style={[authStyles.buttonsSocialAuth, styles.buttonsSocialReg]}>
                            {isIos ? (
                                <Button
                                    buttonColor="#749cf3"
                                    contentStyle={authStyles.button}
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
                                    contentStyle={authStyles.button}
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
                            <Text style={{ ...authStyles.emailText, ...styles.emailTextReg }} variant="bodyLarge">
                                или по эл. почте
                            </Text>
                        </View>

                        <Formik {...formik}>
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values: { displayName, email, password, confirmPassword },
                                isSubmitting,
                                dirty,
                                isValid,
                                errors,
                            }) => (
                                <View style={{ ...authStyles.formContainer, ...styles.formContainerReg }}>
                                    <TextInput
                                        disabled={isSubmitting}
                                        mode="outlined"
                                        label="Имя"
                                        value={displayName}
                                        onBlur={handleBlur('displayName')}
                                        onChangeText={handleChange('displayName')}
                                        error={Boolean(errors.displayName)}
                                        autoCapitalize="none"
                                    />
                                    {/*<HelperText type="error" visible={Boolean(errors.displayName)} padding="normal">*/}
                                    {/*    {errors.displayName}*/}
                                    {/*</HelperText>*/}

                                    <TextInput
                                        autoCapitalize="none"
                                        disabled={isSubmitting}
                                        mode="outlined"
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
                                        secureTextEntry={secureTextEntryPass}
                                        value={password}
                                        onBlur={handleBlur('password')}
                                        onChangeText={handleChange('password')}
                                        right={
                                            <TextInput.Icon
                                                icon="eye"
                                                onPress={() => {
                                                    setSecureTextEntryPass(!secureTextEntryPass);
                                                    return false;
                                                }}
                                            />
                                        }
                                        error={Boolean(errors.password)}
                                    />
                                    <TextInput
                                        disabled={isSubmitting}
                                        mode="outlined"
                                        label="Подтвердите пароль"
                                        secureTextEntry={secureTextEntryConfirm}
                                        value={confirmPassword}
                                        onBlur={handleBlur('confirmPassword')}
                                        onChangeText={handleChange('confirmPassword')}
                                        right={
                                            <TextInput.Icon
                                                icon="eye"
                                                onPress={() => {
                                                    setSecureTextEntryConfirm(!secureTextEntryConfirm);
                                                    return false;
                                                }}
                                            />
                                        }
                                        error={Boolean(errors.confirmPassword)}
                                    />
                                    <Button
                                        contentStyle={authStyles.button}
                                        style={styles.buttonRegistration}
                                        buttonColor="#f3f2f2"
                                        mode="contained"
                                        disabled={isSubmitting}
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        onPress={handleSubmit}
                                    >
                                        <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: '#111C1E' }}>
                                            Присоединиться
                                        </Text>
                                    </Button>
                                    {apiError && !dirty && isValid && (
                                        <div style={{ color: '#ff0000' }}>{apiError}</div>
                                    )}
                                </View>
                            )}
                        </Formik>

                        <View style={authStyles.bottomCard}>
                            <View style={authStyles.bottomCardContent}>
                                <Text style={authStyles.bottomCardText}>Вы уже с нами?</Text>
                                <View style={authStyles.underlineWrapper}>
                                    <Text style={authStyles.underlineText} onPress={handleNavigateToSignIn}>
                                        Войти
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </LoadingWrapper>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};