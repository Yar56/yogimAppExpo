import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#022b42',
        borderRadius: 20,
    },
    cardDisabled: {
        pointerEvents: 'none',
        opacity: 0.5,
    },
    fastImage: {
        width: 'auto',
        height: 200,
        borderRadius: 25,
        marginBottom: 5,
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
    },
    icons: {
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
