import React, { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { View, ScrollView, RefreshControl, Animated, Dimensions } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView, GestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';

import Tabs from '../tabs/tabs';
import styles from './styles';
import OrderItems from './order-items/order-items';
import { useRefresh } from '../../../hooks/useRefresh';
import OrderDetails from './order-details/order-details';
import Header from '../../../components/header/header';
import DeliveredItems from './delivered-items/delivered-items';
import { PurchaseOrderService } from '../../../services/purchase-order-service';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';

const PurchaseOrderDetailScreen = ({ route }: any) => {
    const { orderId } = route.params;
    const purchaseOrderService = new PurchaseOrderService();

    const [activeTab, setActiveTab] = useState<string>('details');
    const translateX = useRef(new Animated.Value(0)).current;
    const screenWidth = Dimensions.get('window').width - 20;

    const { data: purchaseOrder, isLoading, refetch } = useQuery({
        queryKey: ['get-purchase-order', orderId],
        queryFn: () => purchaseOrderService.getOne(orderId),
    });

    const { isRefreshing, onRefresh } = useRefresh(refetch);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    // Smoothly animate tab changes
    const animateTabChange = (index: number) => {
        Animated.timing(translateX, {
            toValue: -index * screenWidth,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    // Handle swipe gestures
    const onGestureEvent = (event: GestureHandlerStateChangeEvent) => {
        const { state, translationX }: any = event.nativeEvent;

        if (state === State.END) {
            const currentIndex = ['details', 'order-items', 'delivered'].indexOf(activeTab);
            if (translationX < -50 && currentIndex < 2) {
                const nextTab = ['details', 'order-items', 'delivered'][currentIndex + 1];
                if (nextTab) {
                    setActiveTab(nextTab);
                    animateTabChange(currentIndex + 1);
                }
            } else if (translationX > 50 && currentIndex > 0) {
                const previousTab = ['details', 'order-items', 'delivered'][currentIndex - 1];
                if (previousTab) {
                    setActiveTab(previousTab);
                    animateTabChange(currentIndex - 1);
                }
            }
        }
    };

    const renderTabContent = () => {
        return (
            <Animated.View
                style={{
                    flexDirection: 'row',
                    width: screenWidth * 3,
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
                    {activeTab === 'order-items' && <OrderItems items={purchaseOrder.items} />}
                </View>
                <View style={{ width: screenWidth }}>
                    {activeTab === 'delivered' && (
                        <DeliveredItems
                            items={purchaseOrder.items.filter(
                                (item: { qtySupplie: string }) => item.qtySupplie !== null
                            )}
                        />
                    )}
                </View>
            </Animated.View>
        );
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler onHandlerStateChange={onGestureEvent}>
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
                    <Tabs activeTab={activeTab} onTabChange={(tab) => {
                        const index = ['details', 'order-items', 'delivered'].indexOf(tab);
                        setActiveTab(tab);
                        animateTabChange(index);
                    }} />
                    <View style={{ flex: 1, overflow: 'hidden' }}>{renderTabContent()}</View>
                </ScrollView>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

export default PurchaseOrderDetailScreen;
