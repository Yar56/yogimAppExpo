import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

import CommonLayout from '../../shared/ui/layouts/CommonLayout';

type CourseDetailsPageProps = NativeStackScreenProps<RootStackParamList, 'CourseDetailsPage'>;
const CourseDetailsPage: FunctionComponent<CourseDetailsPageProps> = ({ route }) => {
    const details = route.params.details;

    return (
        <CommonLayout externalStyles={{ paddingBottom: 100 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text variant="bodyLarge">{details}</Text>
            </ScrollView>
        </CommonLayout>
    );
};

export default CourseDetailsPage;
