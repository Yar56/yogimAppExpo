import React, { FunctionComponent, useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import { LoadingWrapper } from '@/shared/ui/layouts';
import styles from '../signIn/SignInStylesheet';
import { AntDesign } from '@expo/vector-icons';
import { Spacer } from '@/shared/ui/components';
import { Formik, FormikConfig } from 'formik';
import { Button, Text, TextInput } from 'react-native-paper';
import { useAppTheme } from '@/shared/lib/theme';
import * as yup from 'yup';
import { SignInProps } from '../signIn/SignIn';
import { AuthContent } from '@/shared/constants/AuthContent';
import { supabase } from '@/shared/lib/baas';

const schema = yup.object().shape({
    email: yup.string().email('Email некорректен').required('Заполните поле с email'),
});

export interface RecoveryPasswordProps extends SignInProps {
    onHideDialog?();
    onShowDialog?();
}

const RecoveryPassword: FunctionComponent<RecoveryPasswordProps> = ({ onNavigateTarget, onShowDialog }) => {
    const theme = useAppTheme();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleNavigateToSignIn = () => onNavigateTarget(AuthContent.SIGN_IN);

    const formik: FormikConfig<{ email: string }> = {
        initialValues: {
            email: '',
        },
        validationSchema: schema,
        onSubmit: async (values, { resetForm }) => {
            const { email } = values;
            setIsLoading(true);

            try {
                await supabase.auth.resetPasswordForEmail(email);
                onShowDialog?.();
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
                resetForm();
                setIsLoading(false);
            }
        },
    };

    return (
        <View>
            <KeyboardAvoidingView behavior="height" enabled>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                >
                    <LoadingWrapper isLoading={isLoading}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={handleNavigateToSignIn}
                            style={styles.backButton}
                        >
                            <AntDesign name="arrowleft" size={23} color={theme.dark ? '#F1F5F9' : '#000'} />
                        </TouchableOpacity>
                        <Spacer size={13} />
                        <Formik {...formik}>
                            {({ handleChange, handleBlur, handleSubmit, values: { email }, errors }) => (
                                <View style={styles.formContainer}>
                                    <TextInput
                                        outlineStyle={{ borderColor: '#848484' }}
                                        disabled={isLoading}
                                        mode="outlined"
                                        autoCapitalize="none"
                                        label="Адресс эл. почты"
                                        value={email}
                                        onBlur={handleBlur('email')}
                                        onChangeText={handleChange('email')}
                                        error={Boolean(errors.email)}
                                    />

                                    <Button
                                        style={styles.button}
                                        mode="contained-tonal"
                                        dark
                                        buttonColor="#156494"
                                        disabled={isLoading}
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        onPress={handleSubmit}
                                    >
                                        Восстановить
                                    </Button>
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
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default RecoveryPassword;
