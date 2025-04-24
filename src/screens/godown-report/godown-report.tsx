import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';

import GodownReportRow from './row';
import Navbar from '../navbar/navbar';
import { useRefresh } from '../../hooks/use-refresh';
import Dropdown from '../../components/dropdown/dropdown';
import { ALL_GODOWN_ITEMS, GODOWN_ITEMS } from '../../constants';
import CustomButton from '../../components/custom-button/custom-button';
import { GodownReportService } from '../../services/godown-report-service';
import EmptyListMessage from '../../components/empty-list-message/empty-list-message';
import LoadingIndicator from '../../components/loading-indicator/loading-indicator';
import MultiSelectDropdown from '../../components/dropdown/multi-select-dropdown/multi-select-dropdown';

const GodownReport = () => {
    const [reports, setReports] = useState([]);
    const godownReportService = new GodownReportService();

    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            godown: "",
            filterBy: "",
            godownCode: [],
            itemGroupIds: []
        },
    });

    const godown = watch("godown");

    const { data: godowns, refetch } = useQuery({
        queryKey: ["get-godowns"],
        queryFn: () => godownReportService.getAll(),
        enabled: godown === "select",
    });

    const { mutate: onSave, isPending } = useMutation({
        mutationFn: (data: any) => godownReportService.create(data),
        onSuccess: (data) => setReports(data),
        onError: () => { },
    });

    const { isRefreshing, onRefresh } = useRefresh(refetch);

    const onContinue = async (data: any) => {
        await onSave(data);
    };

    return (
        <View style={styles.container}>
            <Navbar />

            <View style={{ marginTop: 10, display: 'flex', flexDirection: "row", gap: 8 }}>
                <View style={{ width: "48%" }}>
                    <Text style={{ fontSize: 14, color: "#333", fontWeight: "bold" }}>Godown</Text>
                    <Controller
                        control={control}
                        name={'godown'}
                        render={({ field: { value } }) => {
                            return (
                                <Dropdown
                                    placeholder="Godown"
                                    options={GODOWN_ITEMS.map(item => item || [])}
                                    value={value}
                                    dropdownStyle={{ height: "50" }}
                                    onChange={(newValue) => {
                                        setValue('godown', newValue.value);
                                        setValue('godownCode', []);
                                        setReports([]);
                                    }}
                                />
                            );
                        }}
                    />
                </View>

                {godown === "all" ? (
                    <View style={{ width: "48%" }}>
                        <Text style={{ fontSize: 14, color: "#333", fontWeight: "bold" }}>Filter By</Text>
                        <Controller
                            control={control}
                            name={'filterBy'}
                            render={() => (
                                <Dropdown
                                    placeholder="Select Godown"
                                    options={ALL_GODOWN_ITEMS.map((item: any) => item || [])}
                                    dropdownStyle={{ height: "50" }}
                                    value={ALL_GODOWN_ITEMS[0].value}
                                    onChange={(newValue) => setValue('filterBy', newValue.value)}
                                />
                            )}
                        />
                    </View>
                ) : (
                    <View style={{ width: "48%" }}>
                        <Text style={{ fontSize: 14, color: "#333", fontWeight: "bold" }}>Select Godown</Text>
                        <Controller
                            control={control}
                            name={'filterBy'}
                            render={({ field: { value } }) => (
                                <MultiSelectDropdown
                                    placeholder="Select Godown"
                                    options={godowns?.map((item: any) => ({
                                        label: item?.godownName,
                                        godownCode: item?.godownCode,
                                        value: item?.godownName
                                    })) || []}
                                    search={true}
                                    dropdownStyle={{ height: "50" }}
                                    value={value || []}
                                    onChange={(newValue: any) => {
                                        setValue('filterBy', newValue);
                                        const selectedIds = newValue.map((item: any) => item.godownCode);
                                        setValue('godownCode', selectedIds);
                                    }}
                                />
                            )}
                        />
                    </View>
                )}
            </View>

            <CustomButton
                title={"Continue"}
                onPress={handleSubmit(onContinue)}
                style={{ marginTop: 30 }}
                disabled={!godown}
            />

            {isPending && (
                <LoadingIndicator />
            )}

            {(reports?.length > 0 && !isPending) &&
                <>
                    <View style={styles.headerRow}>
                        <View style={styles.headerCellItem}>
                            <Text style={styles.headerText}>Godown</Text>
                        </View>
                        <View style={styles.headerCellQuantity}>
                            <Text style={styles.headerText}>Current Stock(KG)</Text>
                        </View>
                    </View>

                    <FlatList
                        data={reports}
                        keyExtractor={(item: any) => item.godownCode}
                        renderItem={({ item }) => (
                            <GodownReportRow
                                godownName={item.godownName}
                                quantity={item.total}
                            />
                        )}
                        ListEmptyComponent={<EmptyListMessage title="No Godown available." />}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                </>
            }
        </View>
    );
};

export default GodownReport;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F4F9FF',
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
        marginTop: 18,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 14,
        color: '#222',
    },
    headerCellItem: {
        width: '60%',
    },
    headerCellQuantity: {
        width: '35%',
        marginLeft: 10,
    },
});
