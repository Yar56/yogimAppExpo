import { AntDesign } from '@expo/vector-icons';
import { AuthResponse } from '@supabase/supabase-js';
import { Formik, FormikConfig } from 'formik';
import React, { FunctionComponent, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as yup from 'yup';

import styles from './SignUpStylesheet';
import { useAppTheme } from '@/app/providers/MaterialThemeProvider';
import { useAppDispatch } from '@/app/store/hooks';
import { userModel } from '@/entities/user';
import { AuthContent } from '@/shared/constants/AuthContent';
import { RoutineScreen, TabName } from '@/shared/routing/NavigationEntities';
import useAppNavigation from '@/shared/routing/useAppNavigation';
import { Spacer } from '@/shared/ui/components/Spacer';
import { LoadingWrapper } from '@/shared/ui/layouts/loading/LoadingWrapper';
import { SignInProps } from '../signIn/SignIn';

const schema = yup.object().shape({
    displayName: yup.string().required('Заполните имя пользователя'),
    email: yup.string().email('Email некорректен').required('Заполните поле с email'),
    password: yup.string().required('Заполните поле с паролем').min(8, 'Пароль слишком короткий - минимум 8 символов'),
    confirmPassword: yup
        .string()
        .required('Подтвердите пароль')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

interface SignUpProps extends SignInProps {}
const SignUp: FunctionComponent<SignUpProps> = ({ onNavigateTarget, onNavigateBack }) => {
    const dispatch = useAppDispatch();
    const theme = useAppTheme();

    const [secureTextEntryPass, setSecureTextEntryPass] = useState(true);
    const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);

    const navigation = useAppNavigation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    // todo обработка ошибок
    // const [apiError, setApiError] = useState<string>('');

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

                navigation.navigate(TabName.ROUTINE_TAB, { screen: RoutineScreen.ROUTINE });
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
        onNavigateTarget(AuthContent.SIGN_IN);
    };

    const handleNavigateToStart = () => onNavigateBack();
    return (
        <LoadingWrapper isLoading={isLoading}>
            <TouchableOpacity activeOpacity={0.5} onPress={handleNavigateToStart} style={styles.backButton}>
                <AntDesign name="arrowleft" size={23} color={theme.dark ? '#F1F5F9' : '#000'} />
            </TouchableOpacity>
            <Spacer size={13} />
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
                    <View style={{ ...styles.formContainer, ...styles.formContainerReg }}>
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
                            outlineStyle={{ borderColor: '#848484' }}
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
                            outlineStyle={{ borderColor: '#848484' }}
                            disabled={isSubmitting}
                            mode="outlined"
                            label={errors.password ? errors.password : 'Пароль'}
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
                            outlineStyle={{ borderColor: '#848484' }}
                            disabled={isSubmitting}
                            mode="outlined"
                            label={errors.confirmPassword ? errors.confirmPassword : 'Подтвердите пароль'}
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
                            contentStyle={styles.button}
                            style={styles.buttonRegistration}
                            buttonColor={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel4}
                            mode="contained"
                            disabled={isSubmitting}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            onPress={handleSubmit}
                            dark={theme.dark}
                        >
                            <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
                                Присоединиться
                            </Text>
                        </Button>
                        {/*{apiError && !dirty && isValid && <div style={{ color: '#ff0000' }}>{apiError}</div>}*/}
                    </View>
                )}
            </Formik>

            <View style={styles.bottomCardContent}>
                <Text>Вы уже с нами?</Text>

                <Text style={styles.underlineText} onPress={handleNavigateToSignIn}>
                    Войти
                </Text>
            </View>
            <Spacer size={10} />
        </LoadingWrapper>
    );
};

export default SignUp;
