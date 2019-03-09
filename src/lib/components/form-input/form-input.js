import classes from "./FormInput.module.css";
import React from "react";

const FormInput = (props) => {
    return (
        <form className={classes.form}>
            <span id="input" className={classes.input} placeholder={props.placeholder} onKeyPress={props.onMessageCommit} contentEditable={true} />
        </form>
    )
}

export default FormInput;
