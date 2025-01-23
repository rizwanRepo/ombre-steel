import { useState } from "react";

import { getFormattedDate } from "../constants";

const useDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState<string>(getFormattedDate());

    const onSelect = (newDate: string) => {
        setSelectedDate(newDate);
    };

    return {
        selectedDate,
        onSelect,
    };
};

export default useDatePicker;
