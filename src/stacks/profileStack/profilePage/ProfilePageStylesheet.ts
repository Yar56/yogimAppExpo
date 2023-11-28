import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingTop: 30,
        paddingRight: 20,
        paddingLeft: 20,
    },
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        // backgroundColor: '#000'
    },
    backgroundImage: {
        // opacity: 0.9
        // transform: [{ rotate: '180deg' }]
    },
    head: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    headTitle: {
        fontWeight: '600',
    },

    mainContainer: {
        display: 'flex',
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default styles;
