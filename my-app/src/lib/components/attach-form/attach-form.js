import React from 'react';
import classes from "../attach-form/AttachForm.module.css";

const AttachForm = ({onSendFile}) => {

    const handleFileChange = (e) => {
        let filelist = e.target.files;
        let blobFileList = [];
        for (let i = 0; i < filelist.length; i++) {
            console.log(typeof filelist, filelist[i]);
            let blobFile = URL.createObjectURL(filelist[i]);
            console.log(blobFile);
            blobFileList.push(blobFile);
        }
        //console.log(blobFileList);
        //console.log(blobFileList.map((el) => <a href={el}></a>));
        onSendFile(blobFileList.map((el) => (filelist[blobFileList.indexOf(el)].type !== 'image/png') ? <div><a href={el}>{filelist[blobFileList.indexOf(el)].name}</a><br /> </div>: <div><img src={el}></img><br /></div>));

    };

    return (
        <label className={classes.AttachFormButton} htmlFor="file-input">
            <i id={2} className={classes.MaterialIcons} style={{fontSize: 24}}>attach_file</i>
            <label className={classes.InvisibleInput}>
                <input id="file-input" type="file" name="files[]" onChange={handleFileChange} multiple />
            </label>
        </label>
    );
}

export default AttachForm;
