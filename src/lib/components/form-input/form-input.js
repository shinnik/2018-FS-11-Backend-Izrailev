import classes from "./FormInput.module.css";
import React from "react";

const FormInput = ({worker, onMessageCommit, placeholder}) => {

    const onMiddlewareMessageCommit = (event) => {
        let payload = {
            worker: worker,
            event: event
        };
        onMessageCommit(payload)
    };

    return (
        <form className={classes.form}>
            <span className={classes.colorpulse}></span>
            <span id="input" className={classes.input} placeholder={placeholder} onKeyPress={onMiddlewareMessageCommit} contentEditable={true} />
        </form>
    )
}

export default FormInput;
