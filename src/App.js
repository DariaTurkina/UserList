import React from 'react';
import './App.scss';
import Items from './Components/Items/'
import Tab from './Components/Tab/'
import CurrentItem from './Components/CurrentItem/'
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// const axios = require('axios');
// const path = "http://someHost:somePort";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  progress: {
    margin: theme.spacing(2),
  }
}));

class App extends React.Component {

  state = {
    appState: "userList",
    tabState: true,
    groupNameInput: "",
    groups: [
      {
        name: "Imagine Dragons",
        members: [
          {
            name: "111"
          },
          {
            name: "112"
          }
        ]
      }
    ],
    inputs: {
      user: {
        label: "User ID",
        value: "",
        helperText: "Only numbers allowed",
        flag: "user"
      },
      userName: {
        label: "User name",
        value: "",
        helperText: "",
        flag: "userName"
      },
      company: {
        label: "Company name",
        value: "",
        helperText: "",
        flag: "company"
      }
    },
    isValid: true,
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

  handlerInput(e, flag) {
    const { value } = e.target;
    const { inputs: { user, userName, company }, inputs } = this.state;
    const numbMask = /^[0-9\b]+$/;

    if (flag === "user" && (numbMask.test(value) || value === "")) {
      this.setState({ inputs: { ...inputs, user: { ...user, value: value } } });
    } else if (flag === "userName") {
      this.setState({ inputs: { ...inputs, userName: { ...userName, value: value } } });
    } else if (flag === "company") {
      this.setState({ inputs: { ...inputs, company: { ...company, value: value } } });
    } else if (flag === "group") {
      this.setState({ groupNameInput: value });
    }
  }

  addItem() {
    const st = this.state;
    if (st.tabState === true) {
      const { user, userName, company } = st.inputs;
      const toAdd = {
        user_id: user.value,
        name: userName.value,
        company_name: company.value,
        array: [{
          name: "111"
        },
        {
          name: "112"
        }]
      }
      if (user.value && userName.value && company.value) {
        this.setState({
          users: [...st.users, toAdd],
          appState: "userList",
          isValid: true
        });
      } else this.setState({ isValid: false });
    } else {
      const toAdd = {
        name: st.groupNameInput,
        members: []
      }
      if (st.groupNameInput) {
        this.setState({
          groups: [...st.groups, toAdd],
          groupNameInput: ""
        })
      }
    }
    //axios
  }

  isErrorTextField(fieldname) {
    if (!this.state.isValid || !this.state.inputs[fieldname].value) return "error";
  }

  renderTextFields() {
    const st = this.state;
    let textFieldsArray = [];
    //not scalable =(
    if (st.tabState === true) {
      Object.keys(st.inputs).forEach((fieldname, idx) => {
        textFieldsArray.push(
          <TextField
            error={!st.isValid && !st.inputs[fieldname].value ? true : false}
            id={st.isValid && st.inputs[fieldname].value ? "outlined-required" : "outlined-error"}
            label={st.inputs[fieldname].label}
            value={st.inputs[fieldname].value}
            className={useStyles.textField}
            key={idx}
            margin="normal"
            variant="outlined"
            helperText={st.inputs[fieldname].helperText}
            onChange={(e) => this.handlerInput(e, st.inputs[fieldname].flag)}
          />
        )
      })
      return textFieldsArray;
    } else if (st.tabState === false) {
      return (
        <TextField
          error={!st.isValid && !st.name ? true : false}
          id={st.isValid && st.name ? "outlined-required" : "outlined-error"}
          label="Group name"
          value={st.groupNameInput}
          className={useStyles.textField}
          key={3}
          margin="normal"
          variant="outlined"
          helperText="Name new group, please"
          onChange={(e) => this.handlerInput(e, "group")}
        />
      )
    }
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

  // addUserAxios(user) {
  // axios.post(`${path}/create`, user)
  //   .then(() => {
  //     axios.get(`${path}/currentUser`, { params: { userID: this.state.userID } })
  //       .then(res => {
  //         const { data } = res;
  // this.setState({ users: [...this.state.users, user], appState: "userList" });
  //     })
  //     .catch(err => {
  //       this.notify(err);
  //     })
  // })
  // .catch(err => {
  //   this.notify(err);
  // })
  // }

  changeTabState(flag) {
    this.setState({ tabState: flag, isValid: true });
  }

  goToCurItem(id) {
    let curItem = "";
    if (this.state.tabState) {
      curItem = this.state.users.filter(e => e.user_id === id);
    } else {
      curItem = this.state.groups.filter(e => e.name === id);
    }
    this.setState({
      appState: "curItem",
      curItem: curItem
    });
  }

  cancel() {
    this.setState({ appState: "userList" });
  }

  render() {
    const state = this.state;
    return (
      <div className="App">
        <div className="addingItem">
          {state.appState === "userList" && this.renderTextFields()}
          {state.appState === "userList" &&
            <div className="addingBut">
              <Button
                variant="outlined"
                className={useStyles.button}
                onClick={() => this.addItem()}
              >
                {state.tabState === true ? "Add user" : "Add group"}
              </Button>
            </div>
          }
          {/* (state.appState === "userList" && state.isValid) &&
            <div className="loader">
              <CircularProgress className={useStyles.progress} />
            </div> */
          }
        </div>
        {state.appState === "curItem" &&
          <div className="buttons">
            <div className="cancelBut">
              <Button
                variant="outlined"
                className={useStyles.button}
                onClick={() => this.cancel()}
              >
                Back
              </Button>

            </div>
          </div>
        }
        {state.appState === "userList" &&
          <div className="listOfArrays">
            <h3>
              <span>{state.tabState === true ? "Users list" : "Groups list"}</span>
            </h3>
          </div>
        }
        {state.appState === "userList" &&
          <Tab
            changeTabState={(flag) => this.changeTabState(flag)}
            tabState={state.tabState}
          />
        }
        {state.appState === "userList" &&
          <Items
            array={state.tabState === true ? state.users : state.groups}
            tabState={state.tabState}
            goToCurItem={(id) => this.goToCurItem(id)}
          />
        }
        {state.appState === "curItem" &&
          <CurrentItem
            item={state.curItem}
            tabState={state.tabState}
            cancel={() => this.cancel()}
            goTocurItem={(id) => this.goToCurItem(id)}
          />
        }
      </div>
    );
  }
}
export default App;
