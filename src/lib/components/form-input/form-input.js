import classes from "./FormInput.module.css";
import React from "react";

const FormInput = (props) => {
    return (
        <form className={classes.form} onSubmit={props.onMessageCommit}>
            <input className={classes.input} type="text" placeholder={props.placeholder} />
        </form>
    )
}

export default FormInput;
