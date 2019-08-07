import React from "react";
import "./App.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Items from "./Components/Items";
import Tab from "./Components/Tab/index";
import CurrentItem from "./Components/CurrentItem";

// const axios = require('axios');
// const path = "http://someHost:somePort";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  progress: {
    margin: theme.spacing(2),
  },
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
            name: "111",
          },
          {
            name: "112",
          },
        ],
      },
    ],
    inputs: {
      user: {
        label: "User ID",
        value: "",
        helperText: "Only numbers allowed",
        flag: "user",
      },
      userName: {
        label: "User name",
        value: "",
        helperText: "",
        flag: "userName",
      },
      company: {
        label: "Company name",
        value: "",
        helperText: "",
        flag: "company",
      },
    },
    isValid: true,
    users: [
      {
        _id: "0001",
        name: "1",
        company_name: "Item1",
        user_id: "First",
        array: [{
          name: "111",
        },
        {
          name: "112",
        }],
      },
      {
        _id: "0010",
        name: "2",
        company_name: "Item2",
        user_id: "Second",
        array: [{
          name: "111",
        },
        {
          name: "112",
        }],
      },
      {
        _id: "0011",
        name: "3",
        company_name: "Item3",
        user_id: "Third",
        array: [{
          name: "111",
        },
        {
          name: "112",
        }],
      },
    ],
  };

  handlerInput(e, flag) {
    const { value } = e.target;
    const { inputs: { user, userName, company }, inputs } = this.state;
    const numbMask = /^[0-9\b]+$/;

    if (flag === "user" && (numbMask.test(value) || value === "")) {
      this.setState({ inputs: { ...inputs, user: { ...user, value } } });
    } else if (flag === "userName") {
      this.setState({ inputs: { ...inputs, userName: { ...userName, value } } });
    } else if (flag === "company") {
      this.setState({ inputs: { ...inputs, company: { ...company, value } } });
    } else if (flag === "group") {
      this.setState({ groupNameInput: value });
    }
  }

  addItem() {
    const st = this.state;
    if (st.tabState) {
      const { user, userName, company } = st.inputs;
      const toAdd = {
        user_id: user.value,
        name: userName.value,
        company_name: company.value,
        array: [{
          name: "111",
        },
        {
          name: "112",
        }],
      };
      if (user.value && userName.value && company.value) {
        this.setState({
          users: [...st.users, toAdd],
          appState: "userList",
          isValid: true,
        });
      } else this.setState({ isValid: false });
    } else {
      const toAdd = {
        name: st.groupNameInput,
        members: [],
      };
      if (st.groupNameInput) {
        this.setState({
          groups: [...st.groups, toAdd],
          groupNameInput: "",
        });
      }
    }
    // axios
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
    const { st } = this.state;
    let curItem = "";
    if (st.tabState) {
      curItem = st.users.filter(e => e.user_id === id);
    } else {
      curItem = st.groups.filter(e => e.name === id);
    }
    this.setState({
      appState: "curItem",
      curItem,
    });
  }

  cancel() {
    this.setState({ appState: "userList" });
  }

  renderTextFields() {
    const {
      isValid,
      inputs,
      tabState,
      groupNameInput,
      name,
    } = this.state;
    const textFieldsArray = [];
    // not scalable =(
    if (tabState) {
      Object.keys(inputs).forEach((fieldname) => {
        textFieldsArray.push(
          <TextField
            error={!!(!isValid && !inputs[fieldname].value)}
            id={isValid && inputs[fieldname].value ? "outlined-required" : "outlined-error"}
            label={inputs[fieldname].label}
            value={inputs[fieldname].value}
            className={useStyles.textField}
            margin="normal"
            variant="outlined"
            helperText={inputs[fieldname].helperText}
            onChange={e => this.handlerInput(e, inputs[fieldname].flag)}
          />,
        );
      });
      return textFieldsArray;
    }
    return (
      <TextField
        error={!!(!isValid && !name)}
        id={isValid && name ? "outlined-required" : "outlined-error"}
        label="Group name"
        value={groupNameInput}
        className={useStyles.textField}
        key={3}
        margin="normal"
        variant="outlined"
        helperText="Name new group, please"
        onChange={e => this.handlerInput(e, "group")}
      />
    );
  }

  render() {
    const { state } = this;
    return (
      <div className="App">
        <div className="addingItem">
          {state.appState === "userList" && this.renderTextFields()}
          {state.appState === "userList"
            && (
              <div className="addingBut">
                <Button
                  variant="outlined"
                  className={useStyles.button}
                  onClick={() => this.addItem()}
                >
                  {state.tabState ? "Add user" : "Add group"}
                </Button>
              </div>
            )
          }
        </div>
        {state.appState === "curItem"
          && (
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
          )
        }
        {state.appState === "userList"
          && (
            <>
              <div className="listOfArrays">
                <h3>
                  <span>{state.tabState ? "Users list" : "Groups list"}</span>
                </h3>
              </div>
              <Tab
                changeTabState={flag => this.changeTabState(flag)}
                tabState={state.tabState}
              />
              <Items
                array={state.tabState ? state.users : state.groups}
                tabState={state.tabState}
                goToCurItem={id => this.goToCurItem(id)}
              />
            </>
          )
        }
        {state.appState === "curItem"
          && (
            <CurrentItem
              item={state.curItem}
              tabState={state.tabState}
              cancel={() => this.cancel()}
              goTocurItem={id => this.goToCurItem(id)}
            />
          )
        }
      </div>
    );
  }
}
export default App;
