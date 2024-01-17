import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingRight: 0,
        paddingLeft: 0,
    },
    infoContainer: {
        paddingHorizontal: 20,
    },
    infoTitle: {
        fontWeight: 'bold',
    },
    scrollView: { overflow: 'visible' },
    scrollViewContentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 12,
    },
});

export default styles;
