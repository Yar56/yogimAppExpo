import { StyleSheet } from 'react-native';

import { screenHeight, screenWidth } from '../../../shared/constants/screenSize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 0,
        paddingLeft: 0,
    },
    image: {
        flex: 1,
        height: (screenHeight / 100) * 70,
        width: screenWidth,
    },
    textContainer: {
        marginTop: -23,
    },

    titleWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        maxWidth: screenWidth * 0.8,
    },
    iconWrapper: {
        width: 50,
    },

    purchaseWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    purchase: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 },

    more: { textDecorationLine: 'underline', fontWeight: 'bold' },

    labelsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    chip: { width: 'auto', display: 'flex' },
});

export default styles;
