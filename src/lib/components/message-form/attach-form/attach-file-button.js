import styles from './shadow.css';
import AttachmentMessage from './attachment-message'


const formTemplate = ` 
    <style>${styles.toString()}</style>
    <label class="input" for="file-input">
	    <i id="2" class="material-icons" style="font-size:24px">attach_file</i>
	<label/>
	<input id="file-input" type="file" id="files" name="files[]" multiple />
`;

export default class AttachFileForm extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = formTemplate;
        this.style.display = 'inline-flex';
        this.style.width = '15%';
        this._initElements();
        this._addHandlers();
    }

    _initElements() {
        const attachmentButton = this.querySelector('.input');
        const attachments = [];

        this.elements = {
            attachmentButton,
            attachments,
        }
    }

    _addHandlers() {
        this.elements.attachmentButton.addEventListener('change', this._onAttachIconPress.bind(this));
    }

    _onAttachIconPress(event) {
        let input = this.elements.attachmentButton.lastChild;
        let filelist = input.children["file-input"].files;
        let attachments = [];
        let attachment = new AttachmentMessage;
        for (let i = 0; i < filelist.length; i++) {
            let f = filelist[i];
            if (f.type === ('image/png') || f.type === ('image/jpeg') || f.type === ('image/gif')) {
                let image = document.createElement('img');
                image.src = URL.createObjectURL(f);
                image.onload = () => URL.revokeObjectURL(image.src);
                attachments.push(image['outerHTML']);
                console.log(attachments);
            }
            else {
                let message = '<li><strong>' + f.name + '</strong> (' + f.type  + ') - ' +
                    f.size + ' bytes, last modified: ' +
                    f.lastModified + '</li>';
                attachment.setMessage(message);
                attachments.push(attachment.innerHTML);
                }
        }
        const attachmentEvent = new CustomEvent('new-attachment', {
            bubbles: true,
            detail: attachments.join('<br>')
        });
        this.dispatchEvent(attachmentEvent);
    }
}

customElements.define('file-form', AttachFileForm);


