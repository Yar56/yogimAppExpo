import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ReactElement } from 'react';
import React, { FlatList, ListRenderItemInfo, StyleSheet, Platform, View } from 'react-native';
import { Text } from 'react-native-paper';

interface Item {
    id: string;
}

interface FlatListComponentProps<T extends Item> {
    items: T[];
    renderItem: (info: ListRenderItemInfo<T>) => ReactElement | null;
    notFoundText: string;
    withPadding?: boolean;
}
const FlatListComponent = <T extends Item>({
    items,
    renderItem,
    notFoundText,
    withPadding = true,
}: FlatListComponentProps<T>) => {
    const bottomTabBarHeight = useBottomTabBarHeight();
    const isAndroid = Platform.OS === 'android';

    if (items.length === 0) {
        return (
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingVertical: 100 }}>
                <Text variant="bodyLarge">{notFoundText}</Text>
            </View>
        );
    }

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator
            contentContainerStyle={[
                styles.wrapper,
                { paddingBottom: isAndroid ? bottomTabBarHeight + 30 : bottomTabBarHeight },
            ]}
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={withPadding ? styles.listStyle : {}}
        />
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        gap: 20,
    },
    listStyle: {
        paddingHorizontal: 20,
    },
});
export default FlatListComponent;
