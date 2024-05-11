import { AntDesign } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import styles from './NavigateLessonButtonStylesheet';
import { useAppTheme } from '../../../../app/providers/MaterialThemeProvider';

export enum Direction {
    PREVIOUS = 'PREVIOUS',
    NEXT = 'NEXT',
}

interface Props {
    lessonIds: string[];
    currentLessonId: string;
    onChangeLesson(direction: Direction): void;
}

const NavigateLessonsButton: FunctionComponent<Props> = ({ lessonIds, currentLessonId, onChangeLesson }) => {
    const theme = useAppTheme();

    const bottomTabBarHeight = useBottomTabBarHeight();

    const currentLinkIndex = lessonIds.findIndex((link) => link.includes(currentLessonId));

    const isFirstLink = lessonIds[currentLinkIndex] === lessonIds[0];
    const isLastLink = lessonIds[currentLinkIndex] === lessonIds[lessonIds.length - 1];

    const handleChange = (direction: Direction) => () => {
        onChangeLesson(direction);
    };

    return (
        <View style={[styles.wrapper, { bottom: bottomTabBarHeight }]}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                {!isFirstLink && (
                    <TouchableOpacity activeOpacity={0.5} onPress={handleChange(Direction.PREVIOUS)}>
                        {isLastLink ? (
                            <Button
                                mode="contained-tonal"
                                dark={theme.dark}
                                buttonColor={theme.colors.colorLevel4}
                                icon={() => (
                                    <AntDesign
                                        name="left"
                                        size={23}
                                        color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel6}
                                    />
                                )}
                            >
                                {isLastLink ? 'Предыдущий урок практики' : ''}
                            </Button>
                        ) : (
                            <IconButton
                                mode="contained-tonal"
                                containerColor={theme.colors.colorLevel4}
                                icon={() => (
                                    <AntDesign
                                        name="left"
                                        size={23}
                                        color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel6}
                                    />
                                )}
                            />
                        )}
                    </TouchableOpacity>
                )}
                {!isLastLink && (
                    <TouchableOpacity activeOpacity={0.5} onPress={handleChange(Direction.NEXT)}>
                        <Button
                            mode="contained-tonal"
                            dark={theme.dark}
                            buttonColor={theme.colors.colorLevel4}
                            icon={() => (
                                <AntDesign
                                    name="right"
                                    size={23}
                                    color={theme.dark ? theme.colors.colorLevel0 : theme.colors.colorLevel6}
                                />
                            )}
                            contentStyle={{ flexDirection: 'row-reverse' }}
                        >
                            Следующий урок практики
                        </Button>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default NavigateLessonsButton;
