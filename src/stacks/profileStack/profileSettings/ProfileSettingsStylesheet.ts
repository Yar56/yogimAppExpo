import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    avatar: { display: 'flex', alignItems: 'center' },
    formContainer: { display: 'flex', flexDirection: 'column', gap: 20 },
    button: {
        paddingVertical: 2,
    },
    errorText: {
        color: '#ff0000',
    },
    authType: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default styles;
