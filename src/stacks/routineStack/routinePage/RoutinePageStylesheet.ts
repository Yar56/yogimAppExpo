import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingRight: 0,
        paddingLeft: 0,
    },
    courses: {
        paddingHorizontal: 20,
    },
    card: { backgroundColor: '#022b42', height: 200, borderRadius: 20 },
    imageContainer: {
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.56)',
        height: '100%',
    },
    image: {
        borderRadius: 20,
        opacity: 0.5,
    },
    controls: {
        marginTop: 'auto',
        margin: 20,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 20,
    },
});

export default styles;
