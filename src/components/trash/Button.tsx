import React from 'react';

type ButtonPropsType = {
    name: string
    activeBtnClasses?: string
    callback: () => void
}

const Button: React.FC<ButtonPropsType> = (props) => {

    return (
        <button className={props.activeBtnClasses} onClick={() => props.callback()}>{props.name}</button>
    );
};

export default Button;