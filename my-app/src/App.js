import React, { Component } from 'react';
import './App.css';
import MessageForm from './lib/components/message-form/index.js'

class App extends Component {
  render() {
    return (
        <div>
          <div class="head"></div>
          <MessageForm></MessageForm>
        </div>
    );
  }
}

export default App;
