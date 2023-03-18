import React, { useState } from 'react';
import './RangeTimePicker.scss';
import { getDate } from '@utils/DateTime/DateTime';

interface RangeTimePickerVM {
    className?: string;
    onChange: (start: Date, end: Date) => void;
}

const RangeTimePicker = (props: RangeTimePickerVM) => {
    const { className, onChange } = props;

    const [startTime, setStartTime] = useState(getDate());
    const [endTime, setEndTime] = useState(getDate(1, 'h'));

    const handleStartTimeChange = (date: Date | null) => {
        if (date) {
            setStartTime(date);
            if (date > endTime) {
                setEndTime(date);
            }
            onChange(date, endTime);
        }
    };

    const handleEndTimeChange = (date: Date | null) => {
        if (date) {
            setEndTime(date);
            if (date < startTime) {
                setStartTime(date);
            }
            onChange(startTime, date);
        }
    };

    return (
        <>
            <input
                id="start-time-picker"
                className={className}
                type="time"
                value={startTime.toTimeString().slice(0, 5)}
                onChange={(e) => handleStartTimeChange(new Date(`1970-01-01T${e.target.value}:00Z`))}
            />
            <span className='time-separator'>-</span>
            <input
                id="end-time-picker"
                className={className}
                type="time"
                value={endTime.toTimeString().slice(0, 5)}
                onChange={(e) => handleEndTimeChange(new Date(`1970-01-01T${e.target.value}:00Z`))}
            />
        </>
    );
};

export default RangeTimePicker;
