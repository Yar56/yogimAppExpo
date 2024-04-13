import React, { FunctionComponent } from 'react';
import { ListRenderItemInfo } from 'react-native';

import { meditationUi } from '../../../../../entities/meditation';
import { supaBaseApi } from '../../../../../shared/api';
import FlatListComponent from '../../../../../shared/ui/components/flatListComponent/FlatListComponent';

const { MeditationCard } = meditationUi;

interface MeditationListProps {
    list?: supaBaseApi.models.MeditationList;
}
const MeditationList: FunctionComponent<MeditationListProps> = ({ list }) => {
    const renderItem = ({ item }: ListRenderItemInfo<supaBaseApi.models.Meditation>) => {
        return <MeditationCard meditation={item} />;
    };
    return (
        <FlatListComponent<supaBaseApi.models.Meditation>
            items={list ?? []}
            renderItem={renderItem}
            notFoundText="Медитации не найдены"
            horizontal
            hasContentInsets={false}
            withPadding={false}
        />
    );
};

export default MeditationList;
