import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { FunctionComponent } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './CoursePageStylesheet';
import { useAppSelector } from '../../../app/store/hooks';
import { Spacer } from '../../../shared/ui/components/Spacer';

type Props = NativeStackScreenProps<RootStackParamList, 'Course'>;

export const CoursePage: FunctionComponent<Props> = ({ route }) => {
    // const safeAreaInsets = useSafeAreaInsets();
    const courseId = route.params.courseId;

    const navigation = useNavigation();
    const course = useAppSelector((state) => state.courseState.courses.find((course) => course.id === courseId));

    const handleBack = () => navigation.goBack();

    return (
        <LinearGradient colors={['#21244A', '#736688', '#C37686']} style={{ flex: 1 }}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <SafeAreaView edges={['bottom', 'top']} style={styles.container}>
                    <TouchableOpacity activeOpacity={0.5} onPress={handleBack}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="chevron-left" size={25} color="#F0FAFB" />
                            <Text>Назад</Text>
                        </View>
                    </TouchableOpacity>

                    <Spacer size={20} />
                    <View>
                        <Text variant="headlineMedium">{course?.title}</Text>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </LinearGradient>
    );
};
