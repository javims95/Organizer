import React, { useState } from 'react';
import './RangeTimePicker.scss';
import { getDate } from '@utils/DateTime/DateTime';

interface RangeTimePickerVM {
    className?: string;
}

const RangeTimePicker = (props: RangeTimePickerVM) => {
    const { className } = props;

    const [startTime, setStartTime] = useState(getDate(undefined, undefined, true));
    const [endTime, setEndTime] = useState(getDate(1, 'h', true));

    const handleStartTimeChange = (date: string | null) => {
        if (date) {
            const [hours, minutes] = date.split(':');
            const newStartTime = new Date(startTime.getTime());
            newStartTime.setHours(Number(hours));
            newStartTime.setMinutes(Number(minutes));
            setStartTime(newStartTime);
        }
    };

    const handleEndTimeChange = (date: string | null) => {
        if (date) {
            const [hours, minutes] = date.split(':');
            const newEndTime = new Date(endTime.getTime());
            newEndTime.setHours(Number(hours));
            newEndTime.setMinutes(Number(minutes));
            setEndTime(newEndTime);
        }
    };

    return (
        <>
            <input
                id="start-time-picker"
                className={className}
                type="time"
                value={startTime.toTimeString().slice(0, 5)}
                onChange={(e) => handleStartTimeChange(e.target.value)}
            />
            <span className='time-separator'>-</span>
            <input
                id="end-time-picker"
                className={className}
                type="time"
                value={endTime.toTimeString().slice(0, 5)}
                onChange={(e) => handleEndTimeChange(e.target.value)}
            />
        </>
    );
};

export default RangeTimePicker;
