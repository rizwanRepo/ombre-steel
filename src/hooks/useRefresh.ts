import { useState } from "react";

export const useRefresh = (refetchFn: Function) => {
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const onRefresh = async () => {
        setIsRefreshing(true);
        await refetchFn();
        setIsRefreshing(false);
    };

    return { isRefreshing, onRefresh };
};
