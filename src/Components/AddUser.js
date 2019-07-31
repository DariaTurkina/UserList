import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { toast, ToastContainer } from 'react-toastify';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    }
}));

export default class AddUser extends React.Component {

    state = {
        user_id: "",
        name: "",
        company_name: ""
    };

    notify() {
        toast.error("There is/are empty field(-s)", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true
        });
    }

    showUserList(data) {
        return data.map((item) => (
            <div className="userInList">
                <a
                    onClick={this.props.goToCurUser(item._id)}
                    id={item._id}
                >{item.user_id}</a>
            </div>
        ));
    }

    handlerInput(e, flag = "company_name") {
        const { value } = e.target;
        const numbMask = /^[0-9\b]+$/;
        const lettersMask = /^[a-zA-Z _]+$/;
        if (flag === "user_id" && numbMask.test(value)) {
            this.setState({ user_id: value });
        } else if (flag === "name" && lettersMask.test(value)) {
            this.setState({ name: value });
        } else if (flag === "company_name" && value.match(lettersMask)) {
            this.setState({ company_name: value });
        }
    }

    addUser() {
        if (this.state.user_id && this.state.name && this.state.company_name) {
            this.props.addUser(this.state);
        } else this.notify();
    }

    render() {
        return (
            <div className="UserList">
                <ToastContainer />
                <div>
                    <TextField
                        id="outlined-required"
                        label="User ID"
                        value={this.state.user_id}
                        className={useStyles.textField}
                        margin="normal"
                        variant="outlined"
                        helperText="Only numbers allowed"
                        onChange={(e) => this.handlerInput(e, "user_id")}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-required"
                        label="User name"
                        value={this.state.name}
                        className={useStyles.textField}
                        margin="normal"
                        variant="outlined"
                        helperText="Only letters allowed"
                        onChange={(e) => this.handlerInput(e, "name")}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-required"
                        label="Company name"
                        value={this.state.company_name}
                        className={useStyles.textField}
                        margin="normal"
                        variant="outlined"
                        helperText="Only letters allowed"
                        onChange={(e) => this.handlerInput(e, "company_name")}
                    />
                </div>
                <Button
                    variant="outlined"
                    className={useStyles.button}
                    onClick={() => this.addUser()}
                >
                    Add
                </Button>
            </div>
        )
    }
}
