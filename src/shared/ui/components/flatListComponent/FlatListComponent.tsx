import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ReactElement } from 'react';
import React, { FlatList, ListRenderItemInfo, StyleSheet, Platform } from 'react-native';

interface Item {
    id: string;
}

interface FlatListComponentProps<T extends Item> {
    items: T[];
    renderItem: (info: ListRenderItemInfo<T>) => ReactElement | null;
}
const FlatListComponent = <T extends Item>({ items, renderItem }: FlatListComponentProps<T>) => {
    const bottomTabBarHeight = useBottomTabBarHeight();
    const isAndroid = Platform.OS === 'android';

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
            style={styles.listStyle}
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
