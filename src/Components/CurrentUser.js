import React from 'react';
import './CurrentUser.css';

const axios = require('axios');
const path = "http://someHost:somePort";

export default class CurrentUser extends React.Component {
    state = {
        user: this.props.user//{}
    }

    // componentDidMount() {
    // axios.get(`${path}/${this.props.userID}`)
    //     .then(res => {
    //         this.setState({ user: res });
    //     })
    //     .catch(err => {
    //         this.notify(err);
    //     })
    // }

    showFriendList(data) {
        return data.map((item) => (
            <div className="userInList">
                <a
                    onClick={() => this.props.goToCurUser(item._id)}
                    id={item._id}
                >{item.name}</a>
            </div>
        ));
    }

    render() {
        console.log("data >> ", this.state);
        return (
            <div className="CurrentUser">
                <div className="personalInfo">
                    <div>
                        <p>User ID: {this.state.user[0].user_id}</p>
                    </div>
                    <div>
                        <p>Name: {this.state.user[0].name}</p>
                    </div>
                    <div>
                        <p>Company name: {this.state.user[0].company_name}</p>
                    </div>
                </div>
                <div className="friends">
                    Friends:
                    {this.showFriendList(this.state.user[0].array)}
                </div>
            </div>
        )
    }
}
