import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#022b42',
        gap: 10,
        position: 'relative',
        borderRadius: 15,
    },
    cardCover: { flex: 1, height: 100, minWidth: 150, maxWidth: 150, resizeMode: 'stretch' },
    info: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 5,
    },
    title: { maxWidth: 160, lineHeight: 20 },
    icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderTopLeftRadius: 12,
        borderBottomRightRadius: 12,
        padding: 7,
        paddingLeft: 10,
    },
});
export default styles;
