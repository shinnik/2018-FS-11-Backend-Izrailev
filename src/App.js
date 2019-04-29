import React, { Component } from 'react';
import './App.css';
import MessageForm from './lib/containers/message-form/index.js'

class App extends Component {
  render() {
      console.log(React.version);
    return (
        <div>
          <div class="head"></div>
          <MessageForm></MessageForm>
        </div>
    );
  }
}

export default App;
