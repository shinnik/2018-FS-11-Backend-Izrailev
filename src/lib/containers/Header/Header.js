import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import { connect } from 'react-redux';
import UserInfo from '../../components/user-info/user-info';


class Header extends PureComponent {

    render () {

        let dropdownMenu;

        if (this.props.isAuth) {
            dropdownMenu = (<ul className="dropdown-content">
                <Link to='/main'>Home</Link>
                <Link to='/list_chats'>Chats</Link>
                <Link to='/login'>Login</Link>
            </ul>);
        }
        else {
            dropdownMenu = (<ul className="dropdown-content">
                <Link to='/main'>Home</Link>
                <Link to='/login'>Login</Link>
            </ul>);
        }

        return (
            <div className={classes.MenuContainer}>
                <UserInfo isAuthorized={this.props.isAuth} name={this.props.name}/>
                <div className="dropdown">
                    <label className="menu-label">
                        <i className={classes.MaterialIcons}>view_headline</i>
                    </label>
                    {dropdownMenu}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.hdr.get('name'),
        isAuth: state.auth.get('token')
    }
};

// const mapDispatchToProps = dispatch => {
//
// };


export default connect(mapStateToProps, null)(Header);
