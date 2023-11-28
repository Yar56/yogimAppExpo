import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export const HomePage: FunctionComponent = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
            <Button mode="contained" onPress={() => navigation.navigate('CoursesTab', { screen: 'Courses' })}>
                go to courses
            </Button>
        </View>
    );
};
