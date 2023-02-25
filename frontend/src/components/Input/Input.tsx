import React, { useState } from 'react';
import './Input.scss';
import { REemail, REnumber, REalpha, REalphanumeric, REdecimal } from '@utils/regex';

interface InputVM {
    id?: string;
    classname?: string;
    type?: string;
    placeholder?: string;
    borderRadius?: boolean;
    value?: string;
    isValid: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputVM> = (props: InputVM) => {
    const [values, setValues] = useState<InputVM>({
        id: props.id || '',
        classname: props.classname || '',
        type: props.type || '',
        placeholder: props.placeholder || '',
        borderRadius: props.borderRadius || false,
        value: props.value || '',
        isValid: true,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        let isValid = REemail.test(newValue);
        switch (props.type) {
            case 'alpha':
                isValid = REalpha.test(newValue);
                break;
            case 'alphanumeric':
                isValid = REalphanumeric.test(newValue);
                break;
            case 'email':
                isValid = REemail.test(newValue);
                break;
            case 'number':
                isValid = REnumber.test(newValue);
                break;
            case 'decimal':
                isValid = REdecimal.test(newValue);
                break;
            default:
                isValid = REalpha.test(newValue);
        }
        setValues({
            ...values,
            value: newValue,
            isValid: isValid,
        });
        if (props.onChange) {
            props.onChange(event);
        }
    };

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (props.onFocus) {
            props.onFocus(event);
        }
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (props.onBlur) {
            props.onBlur(event);
        }
    };

    return (
        <input
            id={values.id}
            className={`input ${values.classname ? values.classname : ''} ${values.borderRadius ? 'border-radius' : ''} ${!values.isValid ? 'invalid' : ''}`}
            type={values.type}
            placeholder={values.placeholder}
            value={values.value}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
        />
    );
};

export default Input;