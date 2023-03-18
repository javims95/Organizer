import React from 'react';
import './Button.scss';

interface ButtonVM {
    id?: string;
    text: string;
    className?: string;
    borderRadius?: boolean;
    style?: React.CSSProperties;
    onClick?: String | (() => void) | ((event: any) => void);
}

const Button = (props: ButtonVM) => {

    const { id, text, className, borderRadius, style, onClick } = props;

    const handleOnClick = (e) => {
        if (typeof onClick === "string") {
            window.location.href = onClick;
        } else if (typeof onClick === "function") {
            onClick(e);
        }
    };

    return (
        <>
            <button
                id={id}
                className={`btn ${className ? className : ''}`}
                style={style}
                onClick={handleOnClick}
            >
                {text}
            </button>
        </>
    );
};

export default Button;
