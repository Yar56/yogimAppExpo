import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingRight: 20,
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    infoTitle: {
        fontWeight: 'bold',
    },
    scrollView: { overflow: 'visible' },
    scrollViewContentContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 12,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    video: {
        backgroundColor: '#000',
        height: 225,
        borderRadius: 20,
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tutor: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {},
});

export default styles;
