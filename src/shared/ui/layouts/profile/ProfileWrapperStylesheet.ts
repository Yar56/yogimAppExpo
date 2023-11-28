import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
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
        // opacity: 0.9,
        // transform: [{ rotate: '180deg' }]
    },

    backButtonContainer: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
});

export default styles;
