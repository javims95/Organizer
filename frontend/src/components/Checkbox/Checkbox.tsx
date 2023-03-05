import React from 'react';
import './Checkbox.scss';

interface CheckboxVM {
    id: string;
    className?: string;
    text?: string;
    link?: string;
}

const Checkbox = (props: CheckboxVM) => {
    const { id, text, className, link } = props;
    if (!link) {
        return (
            <div className='form-check'>
                <input className={className} type="checkbox" id={id} />
                <label htmlFor={id}>{text}</label>
            </div>
        );
    } else {
        return (
            <div className='form-check'>
                <input className={className} type="checkbox" id={id} />
                <a href={link}>{text}</a>
            </div>
        )
    }
};

export default Checkbox;
