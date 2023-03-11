import React, { useState } from 'react';
import Input from '@components/Input/Input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from '@components/Modal/Modal';

interface ModalProps {
    title: string;
    isOpen: boolean;
    setIsOpen: () => void;
}

const CreateEventModal: React.FC<ModalProps> = ({ title, isOpen, setIsOpen }) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <Modal title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
            <Input type='alphanumber' placeholder='Añade un título' />
            <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                locale="es"
                onChange={(update) => {
                    setDateRange(update as any);
                }}
                isClearable={true}
            />
        </Modal>
    );
};

export default CreateEventModal;
