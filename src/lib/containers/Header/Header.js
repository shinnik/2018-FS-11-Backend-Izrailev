import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import { connect } from 'react-redux';
import UserInfo from '../../components/user-info/user-info';


class Header extends Component {
    render () {
        return (
            <div className={classes.MenuContainer}>
                <UserInfo isAuthorized={this.props.isAuth} name={this.props.name}/>
                <div className="dropdown">
                    <label className="menu-label">
                        <i className={classes.MaterialIcons}>view_headline</i>
                    </label>
                    <ul className="dropdown-content">
                        <Link to='/main'>Home</Link>
                        <Link to='/list_chats'>Chats</Link>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.hdr.name,
        isAuth: state.hdr.isAuthorized
    }
};

const mapDispatchToProps = dispatch => {

};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
