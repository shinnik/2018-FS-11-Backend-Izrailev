import Centrifuge from 'centrifuge';
import jwt from 'jsonwebtoken';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/reducers/actions";
import { CENTRIFUGE_SECRET } from "../../../appconfig";

const SECRET = CENTRIFUGE_SECRET;

class CentrifugeClass extends PureComponent {

    componentDidMount() {
        const token = jwt.sign({sub: null}, SECRET, {
            expiresIn: 86400,
        });
        const centrifuge = new Centrifuge('ws://localhost:8081/connection/websocket');
        centrifuge.setToken(token);
        centrifuge.on('connect', () => {
            console.log('centrifuge connection success');
        });
        centrifuge.subscribe('messages', message => {
            console.log(message);
            this.props.onMessageReceived(message);
        });
        centrifuge.connect();
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onMessageReceived: (message) => {
            dispatch( {type: actions.MESSAGE_RECEIVED, payload: message} )
        }
    }
}

export default connect(null, mapDispatchToProps)(CentrifugeClass);
