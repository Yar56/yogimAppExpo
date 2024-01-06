import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { FunctionComponent, PropsWithChildren, useState } from 'react';
import { LayoutChangeEvent, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface CollapsableContainerProps {
    expanded: boolean;
}

export const CollapsableContainer: FunctionComponent<CollapsableContainerProps & PropsWithChildren> = ({
    expanded,
    children,
}) => {
    const [height, setHeight] = useState(0);
    const animatedHeight = useSharedValue(0);

    const onLayout = (event: LayoutChangeEvent) => {
        const onLayoutHeight = event.nativeEvent.layout.height;

        if (onLayoutHeight > 0 && height !== onLayoutHeight) {
            setHeight(onLayoutHeight);
        }
    };

    const collapsableStyle = useAnimatedStyle(() => {
        animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

        return {
            height: animatedHeight.value,
        };
    }, [expanded]);

    return (
        <Animated.View style={[collapsableStyle, { overflow: 'hidden' }]}>
            <View style={{ position: 'absolute' }} onLayout={onLayout}>
                {children}
            </View>
        </Animated.View>
    );
};

interface LessonItemProps {
    lesson: { id: string; title: string; description: string };
}
const LessonItem: FunctionComponent<LessonItemProps> = ({ lesson }) => {
    const [expanded, setExpanded] = useState(false);

    const onItemPress = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.wrap}>
            <TouchableWithoutFeedback key={lesson.id} onPress={onItemPress}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text variant="bodyLarge" style={styles.text}>
                            {lesson.title}
                        </Text>
                    </View>
                    <MaterialCommunityIcons
                        style={[styles.icon, expanded ? styles.iconRevert : {}]}
                        name="chevron-down"
                        size={30}
                        color="#F0FAFB"
                    />
                </View>
            </TouchableWithoutFeedback>
            <CollapsableContainer expanded={expanded}>
                <Text style={[styles.details, styles.text]}>{lesson.description}</Text>
            </CollapsableContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        padding: 17,
        borderRadius: 20,
        backgroundColor: 'rgba(31,43,83,0.6)',
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.5,
    },
    container: { flexDirection: 'row', justifyContent: 'space-between' },
    icon: {},
    iconRevert: {
        transform: 'scale(0.8), rotate(180deg)',
    },
    textContainer: { maxWidth: '98%', justifyContent: 'space-around' },
    details: { marginTop: 10, marginBottom: 7 },
    text: { color: '#E7E1E5' },
});
export default LessonItem;
