import React, {Component} from 'react';
import Layout from './lib/components/Layout/Layout';
import MessageForm from './lib/containers/message-form/index';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Chats from './lib/containers/Chat/chat';
import Auth from './lib/containers/Auth/Auth';
import {connect} from "react-redux";
import * as actions from './store/actions';
import Centrifuge from './lib/containers/Centrifuge/Centrifuge';



const Main = () => (
  <div>
    <h1>Home page</h1>
    <p>Use right-upper icon to navigate</p>
  </div>
);

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoLogin();
    }

    render() {
        let routes = (
            <Layout>
                <Switch>
                    <Route path='/main' exact component={Main}/>
                    <Route path='/login' exact component={Auth}/>
                    <Redirect to='/main'/>
                </Switch>
            </Layout>
        );

        if (this.props.isAuthed) {
            routes = (
                <Layout>
                    <Switch>
                        <Route path='/list_chats/chat_id=1' component={() => <MessageForm id="1"/>}/>
                        <Route path='/list_chats/chat_id=2' component={() => <MessageForm id="2"/>}/>
                        <Route path='/list_chats' exact component={() => <Chats/>}/>
                        <Route path='/main' exact component={Main}/>
                        <Route path='/login' exact component={Auth}/>
                        <Redirect to='/main'/>
                    </Switch>
                </Layout>
            )
        }
        return (
	<div>
		<Router>
            {routes}
        </Router>
		<Centrifuge/>
	</div>

        );

    }
}




const mapStateToProps = state => {
    return {
        isAuthed: state.auth.token !== null,
    }
};

const initMapDispatchToProps = dispatch => {
    return {
        onTryAutoLogin: () => dispatch(actions.authCheckState()),
    }
};

export default connect(mapStateToProps, initMapDispatchToProps)(App);
