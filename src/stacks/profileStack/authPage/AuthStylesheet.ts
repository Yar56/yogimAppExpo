import { StyleSheet } from 'react-native';

import { screenWidth } from '../../../shared/constants/screenSize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingRight: 20,
        paddingLeft: 20,
    },
    containerLoading: {
        opacity: 0.6,
    },
    socialAuthTitle: {
        fontWeight: '700',
        textAlign: 'center',
    },
    buttonsSocialAuth: {
        display: 'flex',
        gap: 10,
        marginBottom: 20,
        marginTop: 50,
    },
    button: {
        paddingVertical: 5,
    },
    emailText: {
        color: '#a3a3f1',
        textAlign: 'center',
        marginBottom: 40,
    },
    formContainer: {
        display: 'flex',
        gap: 20,
        marginBottom: 20,
    },

    recoverPassContainer: {
        display: 'flex',
        gap: 8,
        flexDirection: 'column',
        alignItems: 'center',
    },
    underlineWrapper: { borderBottomWidth: 1.3, borderColor: '#ece3fa' },
    underlineText: {
        fontWeight: 'bold',
        color: '#ece3fa',
    },

    bottomCard: {
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        padding: 14,
        backgroundColor: 'rgba(255,255,255, 0.1)',
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
