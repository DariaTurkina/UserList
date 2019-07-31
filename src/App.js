import React from 'react';
import './App.css';
import Users from './Components/Users.js'
import AddUser from './Components/AddUser.js'
import CurrentUser from './Components/CurrentUser.js'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const axios = require('axios');
const path = "http://someHost:somePort";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

class App extends React.Component {

  state = {
    appState: "userList",
    users: [
      {
        _id: "0001",
        name: "1",
        company_name: "Item1",
        user_id: "First",
        array: [{
          name: "111"
        },
        {
          name: "112"
        }]
      },
      {
        _id: "0010",
        name: "2",
        company_name: "Item2",
        user_id: "Second",
        array: [{
          name: "111"
        },
        {
          name: "112"
        }]
      },
      {
        _id: "0011",
        name: "3",
        company_name: "Item3",
        user_id: "Third",
        array: [{
          name: "111"
        },
        {
          name: "112"
        }]
      }
    ]
  };

  notify(err) {
    toast.error(`${err}`, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true
    });
  }

  // componentDidMount() {
  //   axios.get(`${path}`)
  //     .then(res => {
  //       this.setState({ users: res });
  //     })
  //     .catch(err => {
  //       this.notify(err);
  //     })
  // }

  goToAdding() {
    this.setState({ appState: "addUser" });
  }

  addUser(user) {
    // axios.post(`${path}/create`, user)
    //   .then(() => {
    //     axios.get(`${path}/currentUser`, { params: { userID: this.state.userID } })
    //       .then(res => {
    //         const { data } = res;
    this.setState({ users: [...this.state.users, user], appState: "userList" });
    console.log("state app >>", this.state)
    //     })
    //     .catch(err => {
    //       this.notify(err);
    //     })
    // })
    // .catch(err => {
    //   this.notify(err);
    // })
  }

  goToCurUser(id) {
    const curUser = this.state.users.filter(e => e._id === id);
    this.setState({
      appState: "curUser",
      curUser: curUser
    });
  }

  cancel() {
    this.setState({ appState: "userList" });
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <div className="buttons">
          <div className="setButtons">
            {this.state.appState === "userList" &&
              <Button
                variant="outlined"
                className={useStyles.button}
                onClick={() => this.goToAdding()}
              >
                Add user
              </Button>
            }
            {(this.state.appState === "addUser" ||
              this.state.appState === "curUser") &&
              <Button
                variant="outlined"
                className={useStyles.button}
                onClick={() => this.cancel()}
              >
                Back
              </Button>
            }
          </div>
        </div>
        {this.state.appState === "userList" &&
          <header className="App-header">User list</header>
        }
        {this.state.appState === "addUser" &&
          <header className="App-header">User adding</header>
        }
        {this.state.appState === "userList" &&
          <Users
            userArray={this.state.users}
            goToCurUser={(id) => this.goToCurUser(id)}
          />
        }
        {this.state.appState === "curUser" &&
          <CurrentUser
            user={this.state.curUser}
            cancel={() => this.cancel()}
            goToCurUser={(id) => this.goToCurUser(id)}
          />
        }
        {this.state.appState === "addUser" &&
          <AddUser
            addUser={(user) => this.addUser(user)}
            cancel={() => this.cancel()}
          />
        }
      </div>
    );
  }
}
export default App;
