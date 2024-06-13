import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'none',
        borderRadius: 20,
    },

    cardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    fastImage: {
        width: 'auto',
        height: 200,
        borderRadius: 12,
        marginBottom: 5,
    },
    imageContainer: {
        minHeight: 230,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.56)',
    },
    image: {
        borderRadius: 20,
        opacity: 0.5,
    },
    buttons: {
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15,
        paddingLeft: 15,
        gap: 10,
    },
});
export default styles;
