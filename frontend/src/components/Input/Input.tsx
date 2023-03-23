import React, { useState } from 'react';
import './Input.scss';
import { REemail, REnumber, REalpha, REalphanumeric, REdecimal } from '@utils/regex';

type typeInput = 'alpha' | 'alphanumeric' | 'email' | 'number' |'decimal'
interface InputVM {
    id?: string;
    className?: string;
    type?: typeInput;
    placeholder?: string;
    borderRadius?: boolean;
    value?: string;
    isValid?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
}

// Eliminar onFocus y onBlur. Hacer la validación en el onBlur
const Input = React.forwardRef<HTMLInputElement, InputVM>((props, ref) => {
    const { id, className, type, placeholder, borderRadius, value, onChange, onFocus, onBlur } = props;

    const [values, setValues] = useState<InputVM>({
        id: id || '',
        className: className || '',
        type: type || 'alpha',
        placeholder: placeholder || '',
        borderRadius: borderRadius || false,
        value: value || '',
        isValid: true,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        let isValid = REemail.test(newValue);
        switch (type) {
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
        if (onChange) {
            onChange(event);
        }
    };

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (onFocus) {
            onFocus(event);
        }
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(event);
        }
    };

    return (
        <input
            id={values.id}
            className={`form-control${values.className ? ` ${values.className}` : ''}${values.borderRadius ? ' border-radius' : ''}${!values.isValid ? ' invalid' : ''}`}
            type={values.type}
            placeholder={values.placeholder}
            value={values.value}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={ref}
        />
    );
});

export default Input;
