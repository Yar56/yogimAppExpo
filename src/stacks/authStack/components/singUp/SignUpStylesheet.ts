import { StyleSheet } from 'react-native';

import authStylesheet from '../signIn/SignInStylesheet';

const styles = StyleSheet.create({
    ...authStylesheet,
    buttonRegistration: {
        marginTop: 10,
    },
    formContainerReg: {
        gap: 10,
    },
});

export default styles;
