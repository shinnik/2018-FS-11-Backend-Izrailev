import React from 'react';
import classes from './FormInput.module.css'

const FormInput = ({placeholder, onMessageCommit, isButtonTriggered}) => {

    if (isButtonTriggered === true) {
        let input = document.querySelector("input");
        onMessageCommit(input.value);
        input.value = '';
    };

    let handleSubmit = (e) => {
        console.log(e.target[0].value);
        if (e.target[0].value !== '') {
            console.log(e.target[0].value);
            onMessageCommit(e.target[0].value);
            e.target[0].value = '';
        }
        e.preventDefault();
    };
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <input className={classes.input} type="text" placeholder={placeholder} />
        </form>
    )
};

export default FormInput;
