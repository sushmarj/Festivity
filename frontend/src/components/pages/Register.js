import React, { Component } from 'react';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();


class Register extends Component {

    constructor() {
        super();
        this.serviceUrl = "http://localhost:5000/api/account";
        this.state = {
            emailCheck: true,
            account: [{
                username: '',
                password: '',
                email: '',
                confirmpassword: '',
                gender: '',
                mobileno: '',

                usernameError: '',
                passwordError: '',
                confirmpasswordError: '',
                emailError: '',
                genderError: '',
                mobilenoError: '',
            }]
        }
        this.toggleShow  =  this.toggleShow.bind(this);
    }

    onChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    validate = () => {
        let isError = false;
        const errors = {
            usernameError: "",
            emailError: "",
            passwordError: "",
            confirmpasswordError: '',
            genderError: '',
            mobilenoError: ''

        };
        if (this.state.username.length < 2) {
            isError = true;
            errors.usernameError = "Username needs to be atleast 4 characters long";
        }
        if (this.state.username === '') {
            isError = true;
            errors.usernameError = "Username Required ";
        }
        if (this.state.password === '') {
            isError = true;
            errors.passwordError = "Password Required ";
        }
        if (this.state.confirmpassword === '') {
            isError = true;
            errors.confirmpasswordError = "Confirm Password Required ";
        }
        if (this.state.password !== this.state.confirmpassword) {
            isError = true;
            errors.confirmpasswordError = "Password Mismatch";
        }
        if (this.state.gender === '') {
            isError = true;
            errors.genderError = "Gender Required ";
        }
        if (this.state.mobileno === '') {
            isError = true;
            errors.mobilenoError = "Mobile Number Required ";
        }
        if (this.state.mobileno.length < 10 || this.state.mobileno.length > 10) {
            isError = true;
            errors.mobilenoError = "Enter 10 digits mobile number ";
        }
        this.setState({
            ...this.state,
            ...errors
        });
        return isError;
    };

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        const err = this.validate();
        let newPost = [...this.state.account];
        let newpost = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            gender: this.state.gender,
            mobileno: this.state.mobileno
        };

        fetch('http://localhost:5000/api/account/')
            .then(res => res.json())
            .then(data => {
                for (let index = 0; index < data.length; index++ ) {
                    if (newpost.email === data[index].email) {
                        this.setState({
                            emailCheck: false,
                        });
                    }
                }
                if (this.state.emailCheck) {
                    axios.post(this.serviceUrl, newpost).then((res) => {
                        newPost.push(newpost);
                        this.setState({ account: newPost });
                    });
                    window.alert("Hello " + this.state.username + ", You have successfully Registered");
                    this.props.history.push('/login');
                }
                else alert("you have registered");
            });
    }
    toggleShow()  {
        this.setState({  hidden:  !this.state.hidden  });
    }
    componentDidMount() {
        let _id = this.props.match.params._id;
        axios.get(this.serviceUrl + _id).then((res) => {
            this.setState({
                account: res.data
            })
        })
    }

    render() {

        const { username, password, email, confirmpassword, gender, mobileno, usernameError, passwordError, confirmpasswordError, emailError, genderErro, mobilenoError } = this.state;



        return (

            <div className="row">
                <div className="col-sm-offset-3 col-sm-6">

                    <div className="col-sm-offset-1 col-sm-10 well" >


                        <h2 className="text-center">Create a Account</h2>
                        <hr />

                            <div className="input-group">
                                <span className="glyphicon glyphicon-user text-primary"> </span> &nbsp;&nbsp;
            <label>User Name</label>
                            </div>
                            <div className="form-group" >

                                <input name="username" className="form-control" onChange={this.onChanged}
                                    value={username} type="text" placeholder="Enter valid Name" required />
                                <span style={{ color: "red" }}>{this.state.usernameError}</span>
                            </div>

                            <div className="input-group" >
                                <span className="glyphicon glyphicon-eye-open text-primary" ></span> &nbsp;&nbsp;
                            <label> Password</label>
                            </div>
                            <div className="input-group" >
                                <input name="password" onChange={this.onChanged} type={this.state.hidden ? "password" : "text"}
                                    value={password} placeholder="Enter password" className="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />
                                <span className="input-group-btn">
                                    <button className="btn btn-info glyphicon glyphicon-eye-close" onClick={() => this.toggleShow()}> </button>
                                </span>
                            </div>
                            <br />
                            <div className="input-group" >
                                <span className="glyphicon glyphicon-eye-close text-primary" ></span> &nbsp;&nbsp;
                            <label>Confirm Password</label>
                            </div>

                            <div className="input-group" >
                                <input name="confirmpassword" onChange={this.onChanged} type={this.state.hidden ? "password" : "text"}
                                    value={confirmpassword} placeholder="Enter password again" className="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Password doesn't match, Please enter the correct password " required />
                                <span class="input-group-btn">
                                    <button className="btn btn-info glyphicon glyphicon-eye-close" onClick={() => this.toggleShow()}> </button>
                                </span>
                                <span style={{ color: "red" }}>{this.state.confirmpasswordError}</span>
                            </div>

                            <div className="form-group" className="col-sm-7">
                                <span className="glyphicon glyphicon-envelope text-primary"></span>
                                <label><br />&nbsp; Email Id</label>
                                <input name="email" onChange={this.onChanged}
                                    value={email} type="email" className="form-control" placeholder="Enter the Email Id" required />
                                <span style={{ color: "red" }}>{this.state.emailError}</span>
                            </div>
                            <div className="form-group" className="col-sm-5">
                                <span className="glyphicon glyphicon-earphone text-primary"> </span> &nbsp;&nbsp;
                             <label><br /> Mobile Number</label>
                                <input name="mobileno" onChange={this.onChanged}
                                    value={mobileno} type="Number" className="form-control" placeholder="Enter 10 digits phone Number" required  />
                                <span style={{ color: "red" }}>{this.state.mobilenoError}</span>
                            </div>

                            <div className="form-group">
                                <label> <br /> Gender :</label>&nbsp; &nbsp;
            <input name="gender" onChange={this.onChanged}
                                    value={gender} type="radio" value="Male" /> &#128104;<b> Male</b> &nbsp; &nbsp;
            <input name="gender" onChange={this.onChanged}
                                    value={gender} type="radio" value="Female" /> &#128105;<b> Female</b>&nbsp; &nbsp;
            <input name="gender" onChange={this.onChanged}
                                    value={gender} type="radio" value="Others" /> <b>&#128129; Others</b>
                                <span style={{ color: "red" }}>{this.state.genderError}</span>
                            </div>



                            <input type="checkbox" required />&nbsp;&nbsp; By creating an account, I accept the <a href='/termsandcondn'>Terms & Conditions</a> <br />
                            <button onClick={this.onSubmit.bind(this)} className="btn btn-success btn-block" type="submit">Sign Up</button>



                    </div>
                </div>
            </div>

        )
    }
}

export default Register;


