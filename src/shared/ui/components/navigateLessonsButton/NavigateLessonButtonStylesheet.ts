import { StyleSheet } from 'react-native';

import { screenWidth } from '../../../constants/screenSize';
export default StyleSheet.create({
    wrapper: {
        position: 'absolute',
        padding: 5,
        display: 'flex',
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 65,
    },
});
