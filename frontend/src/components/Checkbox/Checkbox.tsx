import React from 'react';
import './Checkbox.scss';

interface CheckboxVM {
    id: string;
    className?: string;
    text?: string;
    link?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const Checkbox = (props: CheckboxVM) => {
    const { id, text, className, link, checked, onChange } = props;

    const [isChecked, setIsChecked] = React.useState<boolean>(checked || false);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        setIsChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    }

    if (!link) {
        return (
            <div className='form-check'>
                <input
                    className={className}
                    type="checkbox"
                    id={id}
                    defaultChecked={isChecked ? true : false}
                    onChange={handleOnChange}
                />
                <label htmlFor={id}>{text}</label>
            </div>
        );
    } else {
        return (
            <div className='form-check'>
                <input
                    className={className}
                    type="checkbox"
                    id={id}
                    defaultChecked={isChecked ? true : false}
                    onChange={handleOnChange}
                />
                <a href={link}>{text}</a>
            </div>
        )
    }
};

export default Checkbox;
