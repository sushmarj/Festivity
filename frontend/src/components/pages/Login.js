import React, { Component } from 'react';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            hidden: true,
            usernameError: '',
            passwordError: '',
            user: [{
                username: " ",
                password: " "
            }]
        };
        this.toggleShow = this.toggleShow.bind(this);
    }

    onChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    validate = () => {
        let isError = false;
        const errors = {
            usernameError: "",
            passwordError: ""
        };

        if (this.state.username.length < 5) {
            isError = true;
            errors.usernameError = "Username needs to be atleast 5 characters long";
        }
        if (this.state.username === '') {
            isError = true;
            errors.usernameError = "Username Required ";
        }

        if (this.state.password === '') {
            isError = true;
            errors.passwordError = "Password Required ";
        }
        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    onSubmit = () => {
        this.validate();
        const { username, password } = this.state
        let userName = username;
        let passWord = password;
        fetch('http://localhost:5000/api/account/')
            .then(res => res.json())
            .then(data => {
                for (let index in data) {
                    if (userName === data[index].email && passWord === data[index].password) {
                        let expires = "";
                        let date = new Date();
                        date.setTime(date.getTime() + (60 * 60 * 1000));
                        expires = "; expires=" + date.toUTCString();
                        if (data[index].email === "admin123@gmail.com") {
                            document.cookie = "admin = " + data[index].username + "" + expires;
                            document.cookie = "emailAdmin = " + data[index].email + "" + expires;
                        }
                        else {
                            document.cookie = "user = " + data[index].username + "" + expires;
                            document.cookie = "userEmail = " + data[index].email + "" + expires;
                        }
                        this.props.history.push('/');
                        window.location.reload();
                        return data;
                    }
                    else
                        this.props.history.push('/errorPage');
                }
            });
    }

    render() {
        const { username, password } = this.state;
        return (
            <div className="row">
                <br /><br />
                <div className="col-sm-offset-3 col-sm-6">
                    <div className="col-sm-offset-1 col-sm-10 well">
                        <h3 className="text-center"><b>Welcome User</b></h3>
                        <hr />

                        <div className="input-group">
                            <span className="glyphicon glyphicon-user text-primary"> </span> &nbsp;&nbsp;
                                <label>Email ID</label>
                        </div>

                        <div className="input-group"   >
                            <span style={{ background: 'lightgray' }} className="input-group-addon">@</span>
                            <input name="username" className="form-control" onChange={this.onChanged}
                                value={username} type="email" placeholder="Enter valid E-mail Id"
                                pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" required />
                            <span style={{ color: "red" }}>{this.state.usernameError}</span>
                        </div>
                        <br />

                        <div className="input-group" >
                            <span className="glyphicon glyphicon-eye-open text-primary" ></span> &nbsp;&nbsp;
                            <label> Password</label>
                        </div>

                        <div className="input-group"  >
                            <input name="password" onChange={this.onChanged} type={this.state.hidden ? "password" : "text"}
                                value={password} placeholder="Enter password" className="form-control"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />
                            <span className="input-group-btn">
                                <button className="btn btn-info glyphicon glyphicon-eye-close" onClick={() => this.toggleShow()}></button>
                            </span>
                        </div>
                        <br />
                        <input type="checkbox" /> &nbsp;&nbsp;Remember Me <br />
                        <button onClick={this.onSubmit} className="btn btn-primary btn-block">Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;