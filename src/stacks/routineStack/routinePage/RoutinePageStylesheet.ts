import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },

    card: { backgroundColor: '#022b42', height: 250, borderRadius: 20 },
    imageContainer: {
        borderRadius: 20,
        height: '100%',
    },
    image: {
        borderRadius: 20,
    },
    controls: {
        marginTop: 'auto',
        margin: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
    },
    emptyCourseImage: {
        width: 200,
        height: 200,
        opacity: 0.9,
    },

    popularButton: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    infoCoursesWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 5,
    },
    text: {
        textAlign: 'center',
    },
});

export default styles;
