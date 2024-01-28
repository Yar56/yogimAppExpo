import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    head: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    userNameWrapper: {
        gap: 7,
    },
    userName: {
        fontWeight: '600',
    },

    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    listItemWrapper: { marginTop: 20, display: 'flex', gap: 10 },
    listItem: {
        backgroundColor: 'rgba(31,43,83,0.8)',
        borderRadius: 20,
    },
    exitButton: {
        backgroundColor: '#006da4',
    },
});

export default styles;
