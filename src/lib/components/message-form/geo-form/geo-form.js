import style from "./shadow.css";
import getPosition from '../../../../utils/geolocation'

const geoTemplate = ` 
    <style>${style.toString()}</style>
    <label class=icon>
	    <i id="3" class="material-icons" style="font-size:24px">map</i>
	<label/>
`;

const geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 36e5
};

class GeoForm extends HTMLElement {
    constructor() {
        super();
        //head.appendChild(this);
        const shadowRoot = this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = geoTemplate;
        this.style.display = 'flex';
        this.style.width = '15%';
        this._initElements();
        this._addHandlers();
    }

    _initElements() {
        const clickLabel = this.shadowRoot.querySelector('label');
        this.elements = {
            clickLabel,
        }
    }

    _addHandlers() {
        this.elements.clickLabel.addEventListener('click', this._onGeoButtonClick.bind(this))
    }

    _onGeoButtonClick() {
        this.elements.userPosition = [];
        getPosition(geoOptions).then(position => {
            this.elements.userPosition.push(position.coords.latitude.toFixed(5));
            this.elements.userPosition.push(position.coords.longitude.toFixed(5));
            const coordMessage = new CustomEvent('coordinate-message', {
                bubbles: true,
                detail: 'Latitude: ' + String(this.elements.userPosition[0]) + '\n' +
                    'Longitude: ' + String(this.elements.userPosition[1])
            });
            this.dispatchEvent(coordMessage);
            //console.log(this.elements.userPosition);
        }).catch(console.error);
    }
}

customElements.define('geo-form', GeoForm);
export default GeoForm;
