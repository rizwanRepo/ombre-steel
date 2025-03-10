import React, { useState } from 'react';
import moment from 'moment';
import { View, Text, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or any other icon set

import styles from './styles';

export type FilterType = 'date' | 'month' | 'quarter' | 'halfYear' | 'year';

export interface DateFilter {
    fromDate: string;
    toDate: string;
    filterType: FilterType;
}

interface DateRangeFilterProps {
    dateFilter: DateFilter;
    onFilterChange: (newFilter: DateFilter) => void;
    filterTypes?: FilterType[];
}

export const filterOptions = [
    { value: 'date', label: 'By Date' },
    { value: 'month', label: 'By Month' },
    { value: 'quarter', label: 'By Quarter' },
    { value: 'halfYear', label: 'Half Yearly' },
    { value: 'year', label: 'Yearly' }
];

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
    dateFilter,
    onFilterChange,
    filterTypes = ['date', 'month', 'quarter', 'halfYear', 'year']
}) => {
    const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
    const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);

    const handleDateChange = (date: Date, field: keyof DateFilter) => {
        onFilterChange({
            ...dateFilter,
            [field]: moment(date).format('YYYY-MM-DD'),
        });
    };

    const handleFilterTypeChange = (value: FilterType) => {
        let fromDate = dateFilter.fromDate;
        const toDate = moment().format('YYYY-MM-DD');

        switch (value) {
            case 'date':
                fromDate = moment().startOf('month').format('DD-MM-YYYY');
                break;
            case 'month':
                fromDate = moment().startOf('month').format('YYYY-MM-DD');
                break;
            case 'quarter':
                fromDate = moment().startOf('quarter').format('YYYY-MM-DD');
                break;
            case 'halfYear':
                fromDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
                break;
            case 'year':
                fromDate = moment().startOf('year').format('YYYY-MM-DD');
                break;
            default:
                fromDate = moment().startOf('month').format('DD-MM-YYYY');
        }

        onFilterChange({
            fromDate,
            toDate,
            filterType: value
        });
    };

    const showFromDatePicker = () => setFromDatePickerVisibility(true);
    const hideFromDatePicker = () => setFromDatePickerVisibility(false);

    const showToDatePicker = () => setToDatePickerVisibility(true);
    const hideToDatePicker = () => setToDatePickerVisibility(false);

    // Helper function to format the date based on the filter type
    const getFormattedDate = (filterType: FilterType, date: string) => {
        switch (filterType) {
            case 'month':
                return moment(date).format('YYYY-MM');
            case 'quarter':
                const quarter = Math.floor(moment(date).month() / 3) + 1;
                return `Q${quarter} ${moment(date).year()}`;
            case 'halfYear':
                const half = moment(date).month() < 6 ? 'First Half (Jan-Jun)' : 'Second Half (Jul-Dec)';
                return `${half} ${moment(date).year()}`;
            case 'year':
                return moment(date).year().toString();
            case 'date':
            default:
                return moment(date).format('DD-MM-YYYY');
        }
    };

    return (
        <View style={styles.container}>
            {/* <View style={styles.filterTypeContainer}>
                <Text style={styles.label}>Filter Type</Text>
                <View style={{ backgroundColor: "#ccc", borderRadius: 8, width: "100%" }}>
                    <Picker
                        selectedValue={dateFilter.filterType}
                        onValueChange={(itemValue) => handleFilterTypeChange(itemValue as FilterType)}
                        style={styles.picker}
                        dropdownIconColor="gray"
                    >
                        {filterOptions
                            .filter(option => filterTypes.includes(option.value as FilterType))
                            .map(option => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                    </Picker>
                </View>
            </View> */}

            <View style={{ display: "flex", flexDirection: "column" }}>
                {dateFilter.filterType === 'date' && (
                    <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.label}>From</Text>
                            <TouchableOpacity onPress={showFromDatePicker} style={styles.dateInput}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                                    <Text>{getFormattedDate(dateFilter.filterType, dateFilter.fromDate)}</Text>
                                    <Icon name="event" size={20} color="#ccc" style={{ marginRight: 8 }} />
                                </View>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isFromDatePickerVisible}
                                mode="date"
                                onConfirm={(date) => {
                                    handleDateChange(date, 'fromDate');
                                    hideFromDatePicker();
                                }}
                                date={new Date(dateFilter.fromDate)}
                                maximumDate={new Date()}
                                onCancel={hideFromDatePicker}
                            />
                        </View>

                        <View style={styles.dateContainer}>
                            <Text style={styles.label}>To</Text>
                            <TouchableOpacity onPress={showToDatePicker} style={styles.dateInput}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                                    <Text>{getFormattedDate(dateFilter.filterType, dateFilter.toDate)}</Text>
                                    <Icon name="event" size={20} color="#ccc" style={{ marginRight: 8 }} />
                                </View>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isToDatePickerVisible}
                                mode="date"
                                onConfirm={(date) => {
                                    handleDateChange(date, 'toDate');
                                    hideToDatePicker();
                                }}
                                date={new Date(dateFilter.toDate)}
                                maximumDate={new Date()}
                                onCancel={hideToDatePicker}
                            />
                        </View>
                    </View>
                )}

                {/* {dateFilter.filterType === 'month' && (
                    <View style={[styles.dateContainer, { width: "100%" }]}>
                        <Text style={styles.label}>Select Month</Text>
                        <TouchableOpacity onPress={showFromDatePicker} style={styles.dateInput}>
                            <Text>{getFormattedDate(dateFilter.filterType, dateFilter.fromDate)}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isFromDatePickerVisible}
                            mode="date"
                            onConfirm={(date) => {
                                const selectedMonth = moment(date);
                                onFilterChange({
                                    ...dateFilter,
                                    fromDate: selectedMonth.startOf('month').format('YYYY-MM-DD'),
                                    toDate: selectedMonth.endOf('month').format('YYYY-MM-DD')
                                });
                                hideFromDatePicker();
                            }}
                            onCancel={hideFromDatePicker}
                        />
                    </View>
                )}

                {dateFilter.filterType === 'quarter' && (
                    <View style={styles.quarterContainer}>
                        <View style={[styles.quarterPickerContainer, { marginRight: 10 }]}>
                            <Text style={styles.label}>Select Quarter</Text>
                            <View style={styles.inputBorder}>
                                <Picker
                                    selectedValue={Math.floor(moment(dateFilter.fromDate).month() / 3) + 1}
                                    onValueChange={(itemValue) => {
                                        const quarter = itemValue as number;
                                        const year = moment(dateFilter.fromDate).year();
                                        const startDate = moment().year(year).quarter(quarter).startOf('quarter');
                                        onFilterChange({
                                            ...dateFilter,
                                            fromDate: startDate.format('YYYY-MM-DD'),
                                            toDate: startDate.endOf('quarter').format('YYYY-MM-DD')
                                        });
                                    }}
                                    dropdownIconColor="gray"
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Q1 (Jan-Mar)" value={1} />
                                    <Picker.Item label="Q2 (Apr-Jun)" value={2} />
                                    <Picker.Item label="Q3 (Jul-Sep)" value={3} />
                                    <Picker.Item label="Q4 (Oct-Dec)" value={4} />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.quarterPickerContainer}>
                            <Text style={styles.label}>Select Year</Text>
                            <View style={styles.inputBorder}>
                                <Picker
                                    selectedValue={moment(dateFilter.fromDate).year()}
                                    onValueChange={(itemValue) => {
                                        const year = itemValue as number;
                                        const currentQuarter = Math.floor(moment(dateFilter.fromDate).month() / 3) + 1;
                                        const startDate = moment().year(year).quarter(currentQuarter).startOf('quarter');
                                        onFilterChange({
                                            ...dateFilter,
                                            fromDate: startDate.format('YYYY-MM-DD'),
                                            toDate: startDate.endOf('quarter').format('YYYY-MM-DD')
                                        });
                                    }}
                                    style={styles.picker}
                                >
                                    {Array.from({ length: 5 }, (_, i) => moment().year() - i).map(year => (
                                        <Picker.Item key={year} label={year.toString()} value={year} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>
                )}

                {dateFilter.filterType === 'halfYear' && (
                    <View style={styles.halfYearContainer}>
                        <View style={styles.halfYearPickerContainer}>
                            <Text style={styles.label}>Select Period</Text>
                            <View style={styles.inputBorder}>
                                <Picker
                                    selectedValue={moment(dateFilter.fromDate).month() < 6 ? '1' : '2'}
                                    onValueChange={(itemValue) => {
                                        const halfYear = itemValue as string;
                                        const year = moment(dateFilter.fromDate).year();
                                        const startDate = moment().year(year).month(halfYear === '1' ? 0 : 6).startOf('month');
                                        onFilterChange({
                                            ...dateFilter,
                                            fromDate: startDate.format('YYYY-MM-DD'),
                                            toDate: startDate.add(5, 'months').endOf('month').format('YYYY-MM-DD')
                                        });
                                    }}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="First Half (Jan-Jun)" value="1" />
                                    <Picker.Item label="Second Half (Jul-Dec)" value="2" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.halfYearPickerContainer}>
                            <Text style={styles.label}>Select Year</Text>
                            <View style={styles.inputBorder}>
                                <Picker
                                    selectedValue={moment(dateFilter.fromDate).year()}
                                    onValueChange={(itemValue) => {
                                        const year = itemValue as number;
                                        const isFirstHalf = moment(dateFilter.fromDate).month() < 6;
                                        const startDate = moment().year(year).month(isFirstHalf ? 0 : 6).startOf('month');
                                        onFilterChange({
                                            ...dateFilter,
                                            fromDate: startDate.format('YYYY-MM-DD'),
                                            toDate: startDate.add(5, 'months').endOf('month').format('YYYY-MM-DD')
                                        });
                                    }}
                                    style={styles.picker}
                                >
                                    {Array.from({ length: 5 }, (_, i) => moment().year() - i).map(year => (
                                        <Picker.Item key={year} label={year.toString()} value={year} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>
                )}

                {dateFilter.filterType === 'year' && (
                    <View style={styles.yearContainer}>
                        <Text style={styles.label}>Select Year:</Text>
                        <View style={styles.inputBorder}>
                            <Picker
                                selectedValue={moment(dateFilter.fromDate).year()}
                                onValueChange={(itemValue) => {
                                    const year = itemValue as number;
                                    onFilterChange({
                                        ...dateFilter,
                                        fromDate: moment().year(year).startOf('year').format('YYYY-MM-DD'),
                                        toDate: moment().year(year).endOf('year').format('YYYY-MM-DD')
                                    });
                                }}
                                style={styles.picker}
                            >
                                {Array.from({ length: 5 }, (_, i) => moment().year() - i).map(year => (
                                    <Picker.Item key={year} label={year.toString()} value={year} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                )} */}
            </View>
        </View>
    );
};
