import React, { useState, useRef, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    View,
    ScrollView,
    RefreshControl,
    Animated,
    Dimensions,
    PanResponder
} from 'react-native';

import Tabs from '../tabs/tabs';
import styles from './styles';
import OrderItems from './order-items/order-items';
import { useRefresh } from '../../../hooks/use-refresh';
import OrderDetails from './order-details/order-details';
import Header from '../../../components/header/header';
import DeliveredItems from './delivered-items/delivered-items';
import { SWIPE_THRESHOLD, TAB_NAME } from '../../../constants';
import { PurchaseOrderService } from '../../../services/purchase-order-service';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';

const PurchaseOrderDetailScreen = ({ route }: any) => {
    const { orderId } = route.params;
    const purchaseOrderService = new PurchaseOrderService();

    const [activeTab, setActiveTab] = useState<string>(TAB_NAME[0]);
    const translateX = useRef(new Animated.Value(0)).current;
    const screenWidth = useMemo(() => Dimensions.get('window').width - 20, []);

    const { data: purchaseOrder, isLoading, refetch } = useQuery({
        queryKey: ['get-purchase-order', orderId],
        queryFn: () => purchaseOrderService.getOne(orderId),
    });

    const { isRefreshing, onRefresh } = useRefresh(refetch);

    const animateTabChange = (index: number) => {
        Animated.timing(translateX, {
            toValue: -index * screenWidth,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleTabChange = (index: number) => {
        setActiveTab(TAB_NAME[index]);
        animateTabChange(index);
    };

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: (e, gestureState) => {
                    return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
                },
                onMoveShouldSetPanResponder: (e, gestureState) => {
                    return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
                },
                onPanResponderRelease: (_, gestureState) => {
                    const currentIndex = TAB_NAME.indexOf(activeTab);

                    if (Math.abs(gestureState.dx) > SWIPE_THRESHOLD) {
                        if (gestureState.dx > 0 && currentIndex > 0) {
                            handleTabChange(currentIndex - 1);
                        } else if (gestureState.dx < 0 && currentIndex < TAB_NAME.length - 1) {
                            handleTabChange(currentIndex + 1);
                        }
                    } else if (Math.abs(gestureState.dy) > SWIPE_THRESHOLD) {
                        if (gestureState.dy > SWIPE_THRESHOLD) {
                            if (!isRefreshing) {
                                onRefresh();
                            }
                        }
                    }
                },
            }),
        [activeTab, screenWidth, isRefreshing, onRefresh]
    );

    if (isLoading) {
        return <LoadingIndicator />;
    }

    const renderTabContent = () => {
        return (
            <Animated.View
                style={{
                    flexDirection: 'row',
                    width: screenWidth * TAB_NAME.length,
                    transform: [{ translateX }],
                }}
            >
                <View style={{ width: screenWidth }}>
                    {activeTab === 'details' && (
                        <OrderDetails
                            order={purchaseOrder}
                            totalQty={purchaseOrder.items.reduce(
                                (total: number, item: { qty: number }) => (item.qty ? total + item.qty : total),
                                0
                            )}
                        />
                    )}
                </View>
                <View style={{ width: screenWidth }}>
                    {activeTab === 'order-items' &&
                        <OrderItems items={purchaseOrder.items} />
                    }
                </View>
                <View style={{ width: screenWidth }}>
                    {activeTab === 'dispatched' && (
                        <DeliveredItems
                            items={purchaseOrder.items.filter(
                                (item: { qtySupplie: string }) =>
                                    item.qtySupplie !== null &&
                                    Number(item.qtySupplie) !== 0
                            )}
                        />
                    )}
                </View>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <ScrollView
                style={styles.scrollContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Header
                    title="View Purchase Order"
                    iconLibrary="MaterialCommunityIcons"
                    iconName="baby-carriage"
                />
                <Tabs
                    activeTab={activeTab}
                    onTabChange={(tab) => {
                        const index = TAB_NAME.indexOf(tab);
                        handleTabChange(index);
                    }}
                />

                <View style={{ flex: 1, overflow: 'hidden' }}>
                    {renderTabContent()}
                </View>
            </ScrollView>
        </View>
    );
};

export default PurchaseOrderDetailScreen;
