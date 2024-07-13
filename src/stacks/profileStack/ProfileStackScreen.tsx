import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';

import { ChangeTheme } from '@/features/changeTheme';

import { useAppTheme } from '@/shared/lib/theme';
import { CustomHeader } from '@/shared/ui/components';

const ProfileStack = createNativeStackNavigator<RootStackParamList>();

export const ProfileStackScreen: FunctionComponent<StackScreenProps> = ({ screenRoutes }) => {
    const theme = useAppTheme();
    const baseStackColor = theme.colors.colorLevel5;

    return (
        <ProfileStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: baseStackColor },
                header: (props) => (
                    <CustomHeader headerProps={props} theme={theme} changeThemeComponent={<ChangeTheme />} />
                ),
            }}
        >
            {screenRoutes.map((route) => {
                return <ProfileStack.Screen key={route.name} name={route.name} component={route.component} />;
            })}
        </ProfileStack.Navigator>
    );
};
