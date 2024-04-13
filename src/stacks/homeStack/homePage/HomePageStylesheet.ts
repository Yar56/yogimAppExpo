import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 0,
        paddingLeft: 0,
    },
    textContainer: {
        marginTop: -23,
    },

    head: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 15 },
    greetingWrapper: {},
    settings: {
        marginLeft: 'auto',
    },

    card: {
        backgroundColor: '#0b4e77',
        height: 200,
        borderRadius: 20,
        position: 'relative',
        padding: 15,
    },
    cardImage: { height: 170, width: 170, position: 'absolute', right: -20, top: -4 },
    imageContainer: {
        borderRadius: 20,
        // backgroundColor: 'rgba(0,0,0,0.56)',
        height: '100%',
    },
    image: {
        borderRadius: 20,
        // opacity: 0.5,
    },
    controls: {
        width: 270,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
    },

    recommendWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
});

export default styles;
