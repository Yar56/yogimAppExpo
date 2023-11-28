import { StyleSheet, View } from 'react-native';
import { FunctionComponent, memo, ReactNode } from 'react';
import { screenHeight } from '../../../constants/screenSize';

interface Props {
    children?: ReactNode;
    // hiddenTabs?: boolean;
}

const MainWrapper: FunctionComponent<Props> = ({ children }) => {
    return (
        <View style={styles.container}>
            <View style={styles.backgroundGradient}>{children}</View>
            {/*{hiddenTabs ? null : <Tabs />}*/}
        </View>
    );
};

export default memo(MainWrapper);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F1F7'
    },
    backgroundGradient: {
        height: screenHeight,
        paddingTop: 45,
        paddingBottom: 30,
        paddingHorizontal: 20
    }
});
