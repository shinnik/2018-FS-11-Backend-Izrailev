import React, {Component} from 'react';
import Layout from './lib/components/Layout/Layout';
import MessageForm from './lib/containers/message-form/index';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Chats from './lib/containers/Chat/chat';


const Main = () => (
  <div>
    <h1>Home page</h1>
    <p>Use right-upper icon to navigate</p>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
          <Layout>
              <Route path='/list_chats/chat_id=1' component={ () => <MessageForm id="1" /> } />
              <Route path='/list_chats/chat_id=2' component={ () => <MessageForm id="2" /> } />
              <Route path='/list_chats/chat_id=3' component={ () => <MessageForm id="3" /> } />
              <Route path='/list_chats/chat_id=4' component={ () => <MessageForm id="4" /> } />
              <Route path='/list_chats' exact component={ () => <Chats />} />
              <Route path='/main' exact component={Main} />
	      <Route path='/' exact component={Main} />
          </Layout>
      </Router>
    );
  }
}


//class App extends Component {
 // render() {
 //   return (
  //      <div>
  //        <div class="head"></div>
  //        <MessageForm></MessageForm>
  //      </div>
  //  );
 // }
//}


export default App;
