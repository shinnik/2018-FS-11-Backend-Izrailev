import React from 'react';
import classes from "../attach-form/AttachForm.module.css";

const AttachForm = (props) => {

    var ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };


    // const handleFileChange = (e) => {
    //     console.log('!');
    //     let filelist = e.target.files;
    //     let blobFileList = [];
    //     for (let i = 0; i < filelist.length; i++) {
    //         //console.log(typeof filelist, filelist[i]);
    //         let blobFile = URL.createObjectURL(filelist[i]);
    //         //console.log(blobFile);
    //         blobFileList.push(blobFile);
    //     }
    //     //console.log(blobFileList);
    //     //console.log(blobFileList.map((el) => <a href={el}></a>));
    //     onSendFile(blobFileList.map((el, index) => (filelist[blobFileList.indexOf(el)].type !== 'image/png' && filelist[blobFileList.indexOf(el)].type !== 'image/jpeg') ? <div key={ID()}><a key={index} href={el}>{filelist[blobFileList.indexOf(el)].name}</a><br/> </div>: <div key={ID()}><img src={el}></img><br /></div>));
    //     e.target.value = '';
    // };

    return (
        <label className={classes.AttachFormButton} htmlFor="file-input">
            <i id={2} className={classes.MaterialIcons} style={{fontSize: 24}}>attach_file</i>
            <label className={classes.InvisibleInput}>
                <input id="file-input" type="file" name="files[]" onChange={props.onSendFile} multiple />
            </label>
        </label>
    );
}

export default AttachForm;
