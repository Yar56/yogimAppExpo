import { MD3Theme, useTheme } from 'react-native-paper';
import { Merge } from 'type-fest';
import { Material3Scheme } from '@pchmn/expo-material3-theme';
import { CustomColors } from '../styles/themes';

export const useAppTheme = useTheme<MD3Theme & { colors: Merge<Material3Scheme, CustomColors> }>;
