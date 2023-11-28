import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 20,
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    infoTitle: {
        fontWeight: 'bold',
    },
    scrollView: { overflow: 'visible' },
    scrollViewContentContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 12,
    },
});

export default styles;
