import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingRight: 20,
        paddingLeft: 20,
    },
    backgroundContainer: {
        flex: 1,
    },
    buttonsSocialReg: {
        marginTop: 20,
    },
    emailTextReg: {
        marginBottom: 10,
    },
    formContainerReg: {
        gap: 10,
    },
    buttonRegistration: {
        marginTop: 10,
    },

    isAccount: { display: 'flex', gap: 8, flexDirection: 'column', alignItems: 'center' },
    isAccountTitle: { textAlign: 'center', color: 'white' },
    isAccountButtonWrapper: { borderBottomWidth: 1, borderColor: 'white' },
    isAccountButton: { color: 'white' },
});

export default styles;
