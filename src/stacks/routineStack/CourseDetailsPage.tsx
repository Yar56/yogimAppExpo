import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

import { RoutineScreen } from '@/shared/routing/NavigationEntities';
import { CommonLayout } from '@/shared/ui/layouts';

type CourseDetailsPageProps = NativeStackScreenProps<RootStackParamList, RoutineScreen.COURSE_DETAILS_PAGE>;
export const CourseDetailsPage: FunctionComponent<CourseDetailsPageProps> = ({ route }) => {
    const details = route.params.details;

    return (
        <CommonLayout externalStyles={{ paddingBottom: 100 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text variant="bodyLarge">{details}</Text>
            </ScrollView>
        </CommonLayout>
    );
};
