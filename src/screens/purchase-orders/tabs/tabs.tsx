import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';
import { PURCHASE_TAB_ITEMS } from '../../../constants';

interface IProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Tabs = ({ activeTab, onTabChange }: IProps) => (
    <View style={styles.container}>
        {PURCHASE_TAB_ITEMS.map((tab) => (
            <TouchableOpacity
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.activeTab]}
                onPress={() => onTabChange(tab.key)}
            >
                <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
                    {tab.label}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

export default Tabs;
