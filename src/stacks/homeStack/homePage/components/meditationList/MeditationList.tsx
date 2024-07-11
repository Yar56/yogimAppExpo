import React, { FunctionComponent } from 'react';
import { ListRenderItemInfo } from 'react-native';

import { meditationUi } from '@/entities/meditation';
import { MeditationList, Meditation } from '@/shared/api/supaBase';
import { FlatListComponent } from '@/shared/ui/components';

const { MeditationCard } = meditationUi;

interface MeditationListProps {
    list?: MeditationList;
}
export const MeditationListComponent: FunctionComponent<MeditationListProps> = ({ list }) => {
    const renderItem = ({ item }: ListRenderItemInfo<Meditation>) => {
        return <MeditationCard meditation={item} />;
    };
    return (
        <FlatListComponent<Meditation>
            items={list ?? []}
            renderItem={renderItem}
            notFoundText="Медитации не найдены"
            horizontal
            hasContentInsets={false}
            withPadding={false}
        />
    );
};
