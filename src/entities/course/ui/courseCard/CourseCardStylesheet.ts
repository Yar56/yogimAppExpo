import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'none',
        borderRadius: 20,
    },
    cardDisabled: {
        pointerEvents: 'none',
        opacity: 0.5,
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
    },

    imageContainer: {
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingRight: 15,
        paddingLeft: 15,
    },
    icons: {
        paddingRight: 15,
        paddingLeft: 18,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    iconItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});
export default styles;
