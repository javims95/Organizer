import React from 'react';
import './Button.scss';

interface ButtonVM {
    id?: string;
    text: string;
    className?: string;
    link?: string | (() => void);
    borderRadius?: boolean;
}

const Button = (props: ButtonVM) => {

    const { id, text, className, link, borderRadius } = props;

    const handleOnClick = () => {
        if (typeof link === "string") {
            window.location.href = link;
        } else if (typeof link === "function") {
            link();
        }
    };

    return (
        <>
            <button
                id={id}
                className={`btn ${className ? className : ''}`}
                onClick={handleOnClick}
            >
                {text}
            </button>
        </>
    );
};

export default Button;
