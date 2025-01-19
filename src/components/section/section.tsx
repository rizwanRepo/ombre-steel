import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

interface IProps {
    title: string;
    children: React.ReactNode;
}

const Section = ({ title, children }: IProps) => (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {children}
    </View>
);

export default Section;
