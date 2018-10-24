import shadowStyles from './shadow.css';


const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<ul class="result"></ul>
		<span style="display: inline-flex">
		    <form-input name="message_text" placeholder="Cообщение" slot="message-input"></form-input>
		    <div id="firsticon">
		        <i id="1" class="material-icons" style="font-size:24px">send</i>
		    </div>
		    <div id="secondicon">
		        <label class="input" for="file-input">
		            <i id="2" class="material-icons" style="font-size:24px">attach_file</i>
		        <label/>
		        <input id="file-input" type="file" id="files" name="files[]" multiple />
            </div>
        </span>
	</form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.backgroundColor = 'white';
    this.style.position = 'absolute';
    this.style.bottom = '0px';
    this.style.height = 'calc(100% - 60px)'
    this._initElements();
    this._addHandlers();
  }

    _initElements() {
        const form = this.shadowRoot.querySelector('form');
        const messages = this.shadowRoot.querySelector('.result');
        const storedMessages = JSON.parse(sessionStorage.getItem('allMessages')) || [];
        const attachmentButton = this.shadowRoot.querySelector('.input');
        const attachmentMessage = document.createElement('li');

        this.elements = {
            form,
            messages,
            storedMessages,
            attachmentButton,
            attachmentMessage,
        };
        this._showMessages()
    }

    _addHandlers() {
        this.elements.form.addEventListener('submit', this._onSubmit.bind(this));
        this.elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
        this.elements.attachmentButton.addEventListener('change', this._onAttachIconPress.bind(this));
  }

    _onAttachIconPress(evt){
        let input = this.elements.attachmentButton.lastChild;
        let filelist = input.children["file-input"].files;
        let output = [];
        for (let i = 0; i < filelist.length; i++) {
            let f = filelist[i];
            if (f.type === ('image/png') || f.type === ('image/jpeg') || f.type === ('image/gif')) {
                var reader = new FileReader();
                reader.readAsDataURL(f);
                reader.onload = function () {
                  let fileContent = reader.result;
                  this.elements.attachmentMessage.innerHTML = `<img src="${fileContent}">`;
                  this.elements.messages.appendChild(this.elements.attachmentMessage);
                  this.elements.storedMessages.push(this.elements.attachmentMessage.innerHTML);
                  this._showMessages();
                }.bind(this) }
            else {
                    output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
                        f.size, ' bytes, last modified: ',
                        f.lastModified, '</li>');
                }
        if (f.type !== ('image/png')) {
            console.log(output);
            this.elements.attachmentMessage.innerHTML = '<ul>' + output.join('') + '</ul>';
            this.elements.messages.appendChild(this.elements.attachmentMessage);
            this.elements.storedMessages.push(this.elements.attachmentMessage.innerHTML);
            this._showMessages();
        }

            }
    }

    _onSubmit(event) {
        this.elements.storedMessages.push(this.elements.form.elements[0].value);
        this._showMessages();
        event.preventDefault();
        return false;
    }

    _showMessages() {
        sessionStorage.setItem('allMessages', JSON.stringify(this.elements.storedMessages));
        this.elements.messages.innerHTML = this.elements.storedMessages.map(el => `<li>${el}</li>`).join('');
    }

    _onKeyPress(event) {
        if (event.keyCode === 13) {
            this.elements.form.dispatchEvent(new Event('submit'));
        }
    }
}

customElements.define('message-form', MessageForm);

