import { StyleSheet } from 'react-native';

import { screenHeight, screenWidth } from '@/shared/constants/screenSize';

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
});

export default styles;
