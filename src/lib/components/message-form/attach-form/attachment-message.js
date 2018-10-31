export default class AttachmentMessage extends HTMLElement {
    constructor () {
        super();
    }

    setMessage(fileMessage) {
        this.innerHTML = fileMessage;
    }
}

customElements.define('attachment-message', AttachmentMessage);