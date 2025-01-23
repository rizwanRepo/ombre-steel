import React from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';

import RateRow from './rate-row';
import TableStyles from './table-styles';
import { getFormattedDate } from '../../constants';
import Header from '../../components/header/header';
import { ItemRatesService } from '../../services/item-rate-service';
import { useRefresh } from '../../hooks/use-refresh';
import LoadingIndicator from '../../components/loading-indicator/loading-indicator';

const RateTable = () => {
    const itemRatesService = new ItemRatesService();

    const { data: itemRates, isFetching, refetch } = useQuery({
        queryKey: ["get-item-rates"],
        queryFn: () => itemRatesService.getAll(),
    });

    const { isRefreshing, onRefresh } = useRefresh(refetch);

    if (isFetching) {
        return <LoadingIndicator />;
    }

    return (
        <View style={TableStyles.container}>
            <Header
                title="Rates"
                iconLibrary="FontAwesome"
                iconName="money"
                date={getFormattedDate()}
            />

            <View style={TableStyles.headerRow}>
                <Text style={TableStyles.headerText}>Grade</Text>
                <Text style={TableStyles.headerText}>Rate/Kg</Text>
                <Text style={[TableStyles.headerText]}>Action</Text>
            </View>

            <FlatList
                data={itemRates || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <RateRow item={item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
};

export default RateTable;
