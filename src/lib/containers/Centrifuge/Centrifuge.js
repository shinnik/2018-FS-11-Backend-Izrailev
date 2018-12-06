import Centrifuge from 'centrifuge';
import jwt from 'jsonwebtoken';
import React, {Component} from 'react';
import {connect} from 'react-redux';

const SECRET = 'd1914f2c-9d6f-4804-b4ac-cfdca9630fa6';

class CentrifugeClass extends Component {

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
            console.log('comment', message);
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

export default connect()(CentrifugeClass);
