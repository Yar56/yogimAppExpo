import { ReactElement } from 'react';
import React, { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';

interface Item {
    id: string;
}

interface FlatListComponentProps<T extends Item> {
    items: T[];
    renderItem: (info: ListRenderItemInfo<T>) => ReactElement | null;
}
const FlatListComponent = <T extends Item>({ items, renderItem }: FlatListComponentProps<T>) => {
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.wrapper}
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={{ paddingHorizontal: 20 }}
        />
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        gap: 10,
    },
});
export default FlatListComponent;
