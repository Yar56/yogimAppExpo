import { NavigationProp } from '@react-navigation/core/src/types';
import { useNavigation } from '@react-navigation/native';

const useAppNavigation = () => {
    return useNavigation<NavigationProp<RootStackParamList>>();
};
export default useAppNavigation;
