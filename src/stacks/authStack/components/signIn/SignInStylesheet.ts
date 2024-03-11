import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        paddingVertical: 3,
    },

    formContainer: {
        display: 'flex',
        gap: 20,
        marginBottom: 20,
    },

    underlineWrapper: { borderBottomWidth: 1.3, borderColor: '#ece3fa' },
    underlineText: {
        fontWeight: 'bold',
        color: '#ece3fa',
    },

    bottomCardContent: { display: 'flex', alignItems: 'center' },
    bottomCardText: {
        marginBottom: 5,
    },
    errorText: {
        color: '#ff0000',
    },
});

export default styles;
