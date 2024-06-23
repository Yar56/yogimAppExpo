import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        paddingVertical: 3,
    },

    backButton: {
        maxWidth: 30,
    },
    formContainer: {
        display: 'flex',
        gap: 20,
        marginBottom: 20,
    },

    recoverPassContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    underlineWrapper: { borderBottomWidth: 1.3 },
    underlineText: {
        fontWeight: 'bold',
    },

    bottomCardContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    errorText: {
        color: '#ff0000',
    },
});

export default styles;
