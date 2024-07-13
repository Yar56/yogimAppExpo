import { Material3Scheme } from '@pchmn/expo-material3-theme';
import { MD3Theme, useTheme } from 'react-native-paper';
import { Merge } from 'type-fest';

import { CustomColors } from '../styles/themes';

export type AppTheme = MD3Theme & { colors: Merge<Material3Scheme, CustomColors> };

export const useAppTheme = useTheme<AppTheme>;
