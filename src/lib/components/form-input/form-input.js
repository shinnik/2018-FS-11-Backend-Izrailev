import classes from "./FormInput.module.css";
import React from "react";

const FormInput = (props) => {

    const onMiddlewareMessageCommit = (event) => {
        let payload = {
            worker: props.worker,
            event: event
        };
        props.onMessageCommit(payload)
    };

    return (
        <form className={classes.form}>
            <span id="input" className={classes.input} placeholder={props.placeholder} onKeyPress={onMiddlewareMessageCommit} contentEditable={true} />
        </form>
    )
}

export default FormInput;
