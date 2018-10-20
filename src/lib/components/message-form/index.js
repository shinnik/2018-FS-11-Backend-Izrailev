// import styles from './index.css';
import shadowStyles from './shadow.css';

// const slotName = 'message-input';

const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<div class="result"></div>
		<span style="display: inline-flex">
		    <form-input name="message_text" placeholder="Cообщение" slot="message-input"></form-input>
		    <div id="firsticon" style="align-content: center;background-color: whitesmoke">
		        <i id="1" class="material-icons" style="width:60px;height:60px;font-size:60px;left:45px;top:45px">send</i>
		    </div>
		    <div id="secondicon" style="align-content: center;background-color: whitesmoke">
		        <i id="secondicon" class="material-icons" style="width:60px;height:60px;font-size:60px;left:35px;top:45px">attach_file</i>
            </div>
        </span>
	</form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this.style.width = '100%';
    this.style.display = 'flex';
    this.style.position = 'absolute';
    this.style.width = '100%';
    this.style.bottom = '0';
    this._initElements();
    this._addHandlers();
  }

  static get observedAttributes() {
    return [
      'action',
      'method',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this._elements.form[attrName] = newVal;
  }

  _initElements() {
    const form = this.shadowRoot.querySelector('form');
    const message = this.shadowRoot.querySelector('.result');
    // const textarea = this.shadowRoot.querySelector('.textbox');
    const text = this.shadowRoot.querySelector('form-input[name = message_text]');
    this._elements = {
      form,
      message,
      text,
    };
  }

  _addHandlers() {
    this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
    this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
    // this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
  }

  _onSubmit(event) {
    this._elements.message.innerText = Array.from(this._elements.form.elements).map(
      el => el.value,
    ).join(', ');
    event.preventDefault();
    return false;
  }

  _onKeyPress(event) {
    if (event.keyCode == 13) {
      this._elements.form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('message-form', MessageForm);

// var body = document.body;
// var textbox = body.getElementsByTagName('div')[0];
// var temp = `<style>${styles.toString()}</style>`;
// textbox.innerHTML += temp;
