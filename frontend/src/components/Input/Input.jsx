import React from 'react';

function Input(props) {

    return (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

export default Input;
