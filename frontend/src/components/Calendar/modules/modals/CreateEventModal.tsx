import React, { useState, useEffect, useRef } from 'react';
import Input from '@components/Input/Input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from '@components/Modal/Modal';
import Checkbox from '@components/Checkbox/Checkbox';
import RangeTimePicker from '@components/RangeTimePicker/RangeTimePicker';

interface ModalProps {
    title: string;
    isOpen: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    setIsOpen: () => void;
}

const CreateEventModal: React.FC<ModalProps> = ({ title, isOpen, startDate: propsStartDate, endDate: propsEndDate, setIsOpen }) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDateRange, endDateRange] = dateRange;
    const [allDay, setAllDay] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [color, setColor] = useState('#ff0000');
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (propsStartDate && propsEndDate) {
            setDateRange([propsStartDate, propsEndDate]);
        } else if (propsStartDate) {
            setDateRange([propsStartDate, propsStartDate]);
        }
    }, [propsStartDate, propsEndDate]);

    const handleTimeRangeChange = (start: Date | null, end: Date | null) => {
        // Arreglar función vacía
    };
    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    // Recoger datos del formulario
    const handleSubmit = () => {
        let dataForm: object;
        const title = (document.getElementById('title-new-event') as HTMLInputElement).value || '';
        const color = (document.getElementById('color-new-event') as HTMLInputElement).value || '';
        
        if (allDay) {
            dataForm = {
                title: title,
                startDateRange: startDateRange,
                endDateRange: endDateRange,
                color: color
            }
        } else {
            const date = (document.getElementById('date-new-event') as HTMLInputElement).value || '';
            const startTime = (document.getElementById('start-time-picker') as HTMLInputElement).value || '';
            const endTime = (document.getElementById('end-time-picker') as HTMLInputElement).value || '';

            dataForm = {
                title: title,
                date: date,
                startTime: startTime,
                endTime: endTime,
                color: color
            }
        }
        setFormData(dataForm);
        console.log(formData);
    };

    return (
        <Modal title={title} isOpen={isOpen} setIsOpen={setIsOpen} footer btnContinue='Guardar' btnCancel='Cerrar' onContinue={handleSubmit} >
            <form>
                <div className='input-form-modal'>
                    <Input id='title-new-event' type='alphanumber' placeholder='Añade un título' />
                </div>
                <div className="input-form-modal">
                    {allDay ? (
                        <DatePicker
                            id='date-range-new-event'
                            selectsRange={true}
                            startDate={startDateRange}
                            endDate={endDateRange}
                            dateFormat="dd/MM/yyyy"
                            locale="es"
                            onChange={(update) => {
                                setDateRange(update as any);
                            }}
                            isClearable={true}
                        />
                    ) : (
                        <div className='range-time-picker remove-border'>
                            <DatePicker className='not-border fix-width date-new-event' selected={startDate} onChange={(date) => setStartDate(date)} />
                            <RangeTimePicker className='not-border time-new-event' onChange={handleTimeRangeChange} />
                        </div>

                    )}
                    <Checkbox id='all-day' text='Todo el día' checked={allDay} onChange={() => setAllDay(!allDay)} />
                </div>
                <div className='input-form-modal'>
                    <input id='color-new-event' type="color" value={color} onChange={handleColorChange} />
                </div>
            </form>
        </Modal>
    );
};

export default CreateEventModal;
