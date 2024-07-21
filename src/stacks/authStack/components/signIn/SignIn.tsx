import { AntDesign } from '@expo/vector-icons';
import { AuthTokenResponse } from '@supabase/supabase-js';
import { Formik, FormikConfig } from 'formik';
import React, { FunctionComponent, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import * as yup from 'yup';

import { userModel } from '@/entities/user';

import { AuthContent } from '@/shared/constants/AuthContent';
import { useAppDispatch } from '@/shared/lib/redux';
import { useAppTheme } from '@/shared/lib/theme';
import { HomeScreen, TabName } from '@/shared/routing/NavigationEntities';
import useAppNavigation from '@/shared/routing/useAppNavigation';
import { Spacer } from '@/shared/ui/components';
import { LoadingWrapper } from '@/shared/ui/layouts';

import styles from './SignInStylesheet';

const schema = yup.object().shape({
    email: yup.string().email('Email некорректен').required('Заполните поле с email'),
    password: yup.string().required('Заполните поле с паролем').min(8, 'Пароль слишком короткий - минимум 8 символов'),
});

export interface SignInProps {
    onNavigateBack(): void;
    onNavigateTarget(target: AuthContent): void;
}
const SignIn: FunctionComponent<SignInProps> = ({ onNavigateBack, onNavigateTarget }) => {
    const dispatch = useAppDispatch();
    const theme = useAppTheme();
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const navigation = useAppNavigation();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleNavigateToSignUp = () => {
        onNavigateTarget(AuthContent.SIGN_UP);
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

                if (payload?.error?.message && payload.error.message.length !== 0) {
                    throw payload?.error;
                }

                navigation.navigate(TabName.HOME_TAB, { screen: HomeScreen.HOME });
            } catch (error) {
                if (error instanceof Error) {
                    const errorMessage = error.message;
                    Alert.alert(errorMessage);
                }
            } finally {
                setIsLoading(false);
                resetForm();
            }
        },
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
                    values: { email, password },
                    isSubmitting,
                    errors,
                    isValid,
                }) => (
                    <View style={styles.formContainer}>
                        <TextInput
                            outlineStyle={{ borderColor: '#848484' }}
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
                            outlineStyle={{ borderColor: '#848484' }}
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
                        {!isValid && (
                            <HelperText type="error" visible={Boolean(errors)} padding="normal">
                                Заполните все поля чтобы войти
                            </HelperText>
                        )}
                        <Button
                            style={styles.button}
                            mode="contained-tonal"
                            dark
                            buttonColor="#156494"
                            disabled={isSubmitting}
                            // @ts-ignore
                            onPress={handleSubmit}
                        >
                            Войти
                        </Button>
                    </View>
                )}
            </Formik>

            <View>
                <View style={styles.bottomCardContent}>
                    <Text>Еще не с нами?</Text>

                    <Text style={styles.underlineText} onPress={handleNavigateToSignUp}>
                        Присоединиться
                    </Text>
                </View>
            </View>
            <Spacer size={15} />

            {/*<View style={styles.recoverPassContainer}>*/}
            {/*    <Text style={styles.underlineText} onPress={handleRecoveryPage}>*/}
            {/*        Забыли пароль?*/}
            {/*    </Text>*/}
            {/*</View>*/}
            {/*<Spacer size={10} />*/}
        </LoadingWrapper>
    );
};

export default SignIn;
