import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: { width: 190, height: 220 },
    imageBackground: {
        position: 'absolute',
        height: 220,
        width: 190,
    },
    imageBackgroundImage: { borderRadius: 15, opacity: 0.3 },
    cardView: { height: '100%', padding: 15 },
    text: { marginTop: 'auto', lineHeight: 24 },
    time: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
});

export default styles;
