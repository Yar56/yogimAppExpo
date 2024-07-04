import { Platform, StyleSheet } from 'react-native';

import { screenWidth } from '@/shared/constants/screenSize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },

    image: {
        flex: 1,
        width: screenWidth,
    },
    authContainer: {
        flex: 0,
        marginTop: -25,
        paddingBottom: Platform.OS === 'android' ? 20 : 0,
    },
    titleWrapper: {
        position: 'absolute',
        top: -150,
        width: 300,
        paddingLeft: 20,
    },
    title: { fontWeight: 'bold' },
    buttonsSocialAuth: {
        display: 'flex',
        gap: 10,
    },
    button: {
        paddingVertical: 3,
    },
    emailText: {
        textAlign: 'center',
    },
    formContainer: {
        display: 'flex',
        gap: 20,
        marginBottom: 20,
    },
    dividerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    divider: {
        minWidth: '40%',
    },
});

export default styles;
