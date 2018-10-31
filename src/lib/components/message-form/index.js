import shadowStyles from './shadow.css';
import AttachFileForm from './attach-form/attach-file-button';
import GeoForm from './geo-form/geo-form';
import DragAndDropZone from '../drag-n-drop/drag-n-drop';

const attachForm = new AttachFileForm();
const geoForm = new GeoForm();
const dropZone = new DragAndDropZone();

const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<ul class="result"></ul>
		<drop-zone></drop-zone>
		<span style="display: inline-flex">
		    <geo-form></geo-form>
		    <form-input name="message_text" placeholder="Cообщение" slot="message-input"></form-input>
		    <div id="firsticon">
		        <i id="1" class="material-icons" style="font-size:24px">send</i>
		    </div>
        </span>
	</form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    let fi = shadowRoot.querySelector('span');
    fi.appendChild(attachForm);
    this._initElements();
    this._addHandlers();
    this._addStyles();
  }

    _initElements() {
        const form = this.shadowRoot.querySelector('form');
        const messages = this.shadowRoot.querySelector('.result');
        const sendButton = this.shadowRoot.querySelector('i');


        this.elements = {
            form,
            messages,
            sendButton,

        };
    }

    _addStyles() {
        this.elements.form.style.backgroundColor = 'whitesmoke';
        this.style.display = 'block';
        this.style.width = '100%';
        this.style.backgroundColor = 'white';
        this.style.position = 'absolute';
        this.style.bottom = '0px';
        this.style.height = 'calc(100% - 60px)';
    }

    _addHandlers() {
        this.elements.form.addEventListener('submit', this._onSubmit.bind(this));
        this.elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
        this.elements.form.addEventListener('new-attachment', this._onNewAttachment.bind(this));
        this.elements.form.addEventListener('coordinate-message', this._onCoordinateMessage.bind(this));
        this.elements.form.addEventListener('drop-file', this._onDropFile.bind(this));
        this.elements.sendButton.addEventListener('click', this._onMouseClick.bind(this));
    }

    _formMessage(flag, specField) {
      let data = new FormData();
      let date = new Date();
      let time = date.getHours().toString() + ":" + date.getMinutes().toString();
      data.append('author', 'me');
      data.append('time', time);
      if ((flag === "attachment") || (flag === "drop")) {
        data.append('text', null);
        data.append('files', specField);
      }
      else {
        data.append('text', specField);
        data.append('files', null);
      }
      return data;

    }

    _onDropFile(event) {
        let data = this._formMessage("drop", event.detail);
        this._addNewFileMessage(data);
    }

    _onCoordinateMessage(event) {
        let data = this._formMessage('coordinates', event.detail);
        this._addNewMessage(data);
    }

    _onNewAttachment(event) {
        let data = this._formMessage("attachment", event.detail);
        this._addNewFileMessage(data);
    }

    _onSubmit(event) {
        let data = this._formMessage('textMessage', this.elements.form.elements[0].value);
        this._addNewMessage(data);
        event.preventDefault();
        return false;
    }

    _addNewFileMessage(message) {
      fetch('http://localhost:8081/message', {
        method: 'POST',
        body: message,
      }).then(result => console.log(result));

      let prevListElem = this.shadowRoot.querySelector('li');
      var listElem = document.createElement('li');
      var file = message.get('files');
      var time = message.get('time');
      listElem.innerHTML = file;
      this.elements.messages.insertBefore(listElem, prevListElem);
    }

    _addNewMessage(message) {

        fetch('http://localhost:8081/message', {
          method: 'POST',
          body: message,
        }).then(result => console.log(result));

      let prevListElem = this.shadowRoot.querySelector('li');
      let listElem = document.createElement('li');
      let text = message.get('text');
      let time = message.get('time');
      listElem.innerHTML = text;

      this.elements.messages.insertBefore(listElem, prevListElem);
    }

    _onMouseClick(event) {
        this.elements.form.dispatchEvent(new Event('submit'));
    }

    _onKeyPress(event) {
        if (event.keyCode === 13) {
            this.elements.form.dispatchEvent(new Event('submit'));
        }
    }
}

customElements.define('message-form', MessageForm);

