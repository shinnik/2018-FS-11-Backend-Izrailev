import React from 'react';
import classes from "../attach-form/AttachForm.module.css";

const AttachForm = ({onSendFile}) => {

    return (
        <label className={classes.AttachFormButton} htmlFor="file-input">
            <i id={2} className={classes.MaterialIcons} style={{fontSize: 24}}>attach_file</i>
            <label className={classes.InvisibleInput}>
                <input id="file-input" type="file" name="files[]" onChange={onSendFile} multiple />
            </label>
        </label>
    );
}

export default AttachForm;
