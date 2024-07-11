import { AntDesign } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Image, LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from 'react-native';
import { Button, Dialog, Divider, Text } from 'react-native-paper';

import styles from './AuthStartPageStylesheet';
import { useAppTheme } from '@/shared/lib/theme';
import { AuthContent } from '@/shared/constants/AuthContent';
import { AUTH_BACKGROUND_DARK, AUTH_BACKGROUND_LIGHT } from '@/shared/constants/resourses';
import { Spacer } from '@/shared/ui/components';
import { CommonLayout } from '@/shared/ui/layouts';
import SignIn, { SignInProps } from '../components/signIn/SignIn';
import SignUp from '../components/singUp/SignUp';
import RecoveryPassword, { RecoveryPasswordProps } from '../components/recoveryPassword/RecoveryPassword';
import useModalState from '../hooks/useModalState';

const contentByType: Record<AuthContent, React.ElementType<SignInProps & RecoveryPasswordProps>> = {
    [AuthContent.SIGN_IN]: SignIn,
    [AuthContent.SIGN_UP]: SignUp,
    [AuthContent.RECOVERY]: RecoveryPassword,
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const layoutAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

const AuthStartPage = () => {
    const theme = useAppTheme();
    const isIos = Platform.OS === 'ios';
    const [activeContent, setActiveContent] = useState<AuthContent | null>(null);
    const { visible, showDialog, hideDialog } = useModalState();
    const handleNavigateToDefault = () => {
        layoutAnimation();
        setActiveContent(null);
    };
    const handleNavigateTarget = (target: AuthContent) => {
        layoutAnimation();
        setActiveContent(target);
    };

    const handleNavigateToAuth = () => {
        layoutAnimation();
        setActiveContent(AuthContent.SIGN_IN);
    };
    const handleNavigateToReg = () => {
        layoutAnimation();
        setActiveContent(AuthContent.SIGN_UP);
    };
    const AuthComponent = useMemo(() => (activeContent ? contentByType[activeContent] : null), [activeContent]);

    return (
        <View style={[styles.container]}>
            <Image
                source={theme.dark ? AUTH_BACKGROUND_DARK : AUTH_BACKGROUND_LIGHT}
                style={[styles.image, { opacity: theme.dark ? 0.45 : 0.9 }]}
                resizeMode="cover"
            />

            <CommonLayout externalStyles={styles.authContainer}>
                <View style={styles.titleWrapper}>
                    <Text variant="headlineMedium" style={styles.title}>
                        Изучайте йогу вместе с Йожим
                    </Text>
                    <Spacer size={7} />
                    <Text variant="bodyLarge" style={styles.title}>
                        Лучшие практики на вашем коврике
                    </Text>
                </View>
                <View style={{ position: 'relative' }}>
                    {activeContent && AuthComponent ? (
                        <AuthComponent
                            onNavigateBack={handleNavigateToDefault}
                            onNavigateTarget={handleNavigateTarget}
                            onShowDialog={showDialog}
                        />
                    ) : (
                        <View>
                            <View>
                                <TouchableOpacity activeOpacity={0.5} onPress={handleNavigateToReg}>
                                    <Button
                                        icon={() => <AntDesign name="arrowright" size={23} color="#F1F5F9" />}
                                        style={styles.button}
                                        mode="contained-tonal"
                                        dark
                                        buttonColor="#156494"
                                        contentStyle={{ flexDirection: 'row-reverse' }}
                                    >
                                        Создать новый аккаунт
                                    </Button>
                                </TouchableOpacity>
                                <Spacer size={15} />
                                <TouchableOpacity activeOpacity={0.5} onPress={handleNavigateToAuth}>
                                    <Button mode="text">У меня уже есть аккаунт</Button>
                                </TouchableOpacity>
                            </View>
                            <Spacer size={15} />
                            <View style={styles.dividerWrapper}>
                                <Divider style={styles.divider} />
                                <Text style={styles.emailText} variant="bodyLarge">
                                    или
                                </Text>
                                <Divider style={styles.divider} />
                            </View>

                            <Spacer size={20} />
                            <View style={styles.buttonsSocialAuth}>
                                {isIos ? (
                                    <Button
                                        contentStyle={styles.button}
                                        mode="contained-tonal"
                                        dark
                                        disabled
                                        buttonColor="#156494"
                                        onPress={() => console.log('Pressed')}
                                    >
                                        Войти с Apple
                                    </Button>
                                ) : (
                                    <Button
                                        contentStyle={styles.button}
                                        mode="contained-tonal"
                                        dark
                                        disabled
                                        buttonColor="#156494"
                                        onPress={() => console.log('Pressed')}
                                    >
                                        Войти с Google
                                    </Button>
                                )}
                                <Spacer size={5} />
                            </View>
                        </View>
                    )}
                </View>
            </CommonLayout>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Письмо отправлено</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">Проверьте свою почту, чтобы сбросить пароль!</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Хорошо</Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    );
};

export default AuthStartPage;
