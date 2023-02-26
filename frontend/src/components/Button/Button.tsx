import React from 'react';
import './Button.scss';

interface ButtonVM {
    id: string;
    text: string;
    classname?: string;
    link?: string | (() => void);
    borderRadius?: boolean;
}

const Button = (props: ButtonVM) => {

    const { id, text, classname, link, borderRadius } = props;

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
                className={`button ${classname ? classname : ''}`}
                onClick={handleOnClick}
            >
                {text}
            </button>
        </>
    );
};

export default Button;
