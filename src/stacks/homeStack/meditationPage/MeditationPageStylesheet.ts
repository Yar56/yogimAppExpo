import { StyleSheet } from 'react-native';

import { screenWidth } from '@/shared/constants/screenSize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 50,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 150,
    },
    audioStateWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    playerWrapper: { display: 'flex', flexDirection: 'column', gap: 20 },

    controlsWrapper: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' },
    sliderWrapper: { display: 'flex', alignItems: 'center' },
    description: {
        textAlign: 'center',
    },
    slider: {
        width: screenWidth - 60,
        flex: 1,
    },
});

export default styles;
