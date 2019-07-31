import React from 'react';
import './Users.css';

export default class Users extends React.Component {

    showUserList(data) {
        return data.map((item) => (
            <div
                id={item._id}
                className="userInList"
            >
                <a onClick={() => this.props.goToCurUser(item._id)}
                >{item.user_id}</a>
            </div>
        ));
    }

    render() {
        return (
            <div className="UserList">
                {this.showUserList(this.props.userArray)}
            </div>
        )
    }
}
