import React, { Component } from 'react';
import axios from 'axios';
import  createHistory from 'history/createBrowserHistory';
import Row from './Row';
const history= createHistory();


export class EventRegistration extends Component {

    constructor(props) {
        super(props);
        this.serviceUrl = "http://localhost:5000/api/eventreg/";
        
        this.state = {
            event:[],
            reg:[{
            _id:'',
            fullname: '',
            lastname:'',
            eventregistered:'',
            email: '',
            mobileno: '',
            headcountadult: '',
            headcountchild:'',
            headcountbaby:'',
            eventid:'',
            veg:'',
            nonveg:'',
            drinks:''
        }],
            fullnameError: '',
            emailError: '',   
            mobilenoError: '',
            headcountadultError: '',
            headcountchildError:'',
            headcountbabyError:''
           
      
            
        }
    }

    onChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    validate = () => {
        let isError = false;
        const errors = {
            fullnameError: '',
            emailError: '',
            mobilenoError: '',
            headcountadultError: '',
            headcountchildError:'',
            headcountbabyError:''
           
        };
        if (this.state.fullname.length < 5) {
            isError = true;
            errors.fullnameError = "Full name needs to be atleast 5 characters long";
        }
        if (this.state.fullname === '') {
            isError = true;
            errors.fullnameError = "Full name Required ";
        }

        if (this.state.email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = "Requires valid email";
        }
        if (this.state.mobileno === '') {
            isError = true;
            errors.mobilenoError = "Mobile Number Required ";
        }
        if (this.state.mobileno.length < 10) {
            isError = true;
            errors.mobilenoError = "Mobile Number must be 10 digits";
        }
        if (this.state.headcountadult === '') {
            isError = true;
            errors.headcountadultError = "Adult headcount Required ";
        }
       
        
       
        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };



    onSubmit=(event)=>{
        event.preventDefault();
        console.log(this.state);
        window.alert("Congratulation " +this.state.fullname+ " you have successfully Registered for the Event",  );
        this.props.history.push('/');
        

        let newPost=[...this.state.reg];
            let newpost={
                _id:this.state._id,
                fullname:this.state.fullname,
                lastname:this.state.lastname,
                eventregistered:Date(),
                email:this.state.email,
                mobileno:this.state.mobileno,
                headcountadult:this.state.headcountadult,
                headcountchild:this.state.headcountchild,
                headcountbaby:this.state.headcountbaby,
                eventid:this.props.match.params._id,
                veg:this.state.veg,
                nonveg:this.state.nonveg,
                drinks:this.state.drinks
            }
            axios.post(this.serviceUrl, newpost).then((res)=>{
                newPost.push(newpost);
                this.setState({reg:newPost});
            })
    }
    componentDidMount() {
        let id = this.props.match.params._id;
      
        axios.get(this.serviceUrl +id).then((res) => {
           
           this.setState({
            reg: res.data
           })
        })
      }
      cancelClick=()=>{
        this.props.history.push('/');
    }
    render() {
        const {  fullname, lastname, email, mobileno, headcountadult, headcountchild, headcountbaby, eventid, veg, nonveg, drinks} = this.state;

        return (
            <div className="row">
            <div className="col-sm-offset-2 col-sm-8">
            <div className="well">
                <h2 className="col-md-offset-4">Event Registration</h2> <hr/>
               
                <form >

                    <div className="form-group"  className="col-sm-offset-1 col-sm-4">
                    <span className="glyphicon glyphicon-user"> </span> &nbsp;&nbsp;
                    <label>First Name</label>
                    
                        <input name="fullname" onChange={this.onChanged}
                            value={fullname} type="text" className="form-control" placeholder="Enter the Fullname" required />
                   <span style={{color: "red"}}>{this.state.fullnameError}</span>
                    </div>
                    <div className="form-group"  className="col-sm-offset-1 col-sm-4">
                    <span className="glyphicon glyphicon-user"> </span> &nbsp;&nbsp;
                    <label>Last Name</label>
                    
                        <input name="lastname" onChange={this.onChanged}
                            value={lastname} type="text" className="form-control" placeholder="Enter the last name" />
                    </div>  
                    <br/>
                    <br/><br/>
                  
                    <div className="form-group" className="col-sm-offset-1 col-sm-5">
                             
                    <label><br/>&#9993; Email Id</label>
                        <input name="email" onChange={this.onChanged}
                            value={email} type="email" className="form-control" placeholder="Enter the Email Id" required/>
                    <span style={{color: "red"}}>{this.state.emailError}</span>
                    </div>
                    <div className="form-group" className="col-sm-4">
                 
                    <label><br/>&#128222; Mobile Number</label>
                        <input name="mobileno" onChange={this.onChanged}
                            value={mobileno} type="Number" className="form-control" placeholder="Enter 10 digits phone Number"  minLength={10} maxLength={10} required />
                    <span style={{color: "red"}}>{this.state.mobilenoError}</span>
                    </div>
                    
                    <br/>
                    <br/><br/>
                    <div ><br/>
                    <lable ><br/><b className="col-sm-offset-1">&nbsp; &nbsp; HeadCount Member to attend Event</b> <br/>
                    <div className="form-group" className="col-sm-offset-1 col-sm-3">
                        <label>&#128106; Adult (15+ years) :</label>
                        <input name="headcountadult" placeholder="number of adults" onChange={this.onChanged}
                            value={headcountadult} type="Number" className="form-control" required/>
                    <span style={{color: "red"}}>{this.state.headcountadultError}</span>
                    </div>
                    <div className="form-group" className=" col-sm-3">
                        <label>&#128108; child (6-15years):</label>
                        <input name="headcountchild" placeholder="number of children" onChange={this.onChanged}
                            value={headcountchild} type="Number" className="form-control" />
                    
                    </div>
                    <div className="form-group" className="col-sm-3">
                        <label>&#128118; baby (0-5years):</label>
                        <input name="headcountbaby" placeholder="number of babies" onChange={this.onChanged}
                            value={headcountbaby} type="Number" className="form-control" />
        
                    </div>
                    </lable></div>
                    <br/>
                    <br/><br/>
                    <div ><br/>
                        <lable><b className="col-sm-offset-1">&nbsp; &nbsp;Food options</b> <br/>
                    <div className="form-group" className="col-sm-offset-1 col-sm-3">
                        <label>&#127857; Veg :</label>
                        <input name="veg" onChange={this.onChanged} className="form-control" placeholder="Enter Quantity of Veg"
                            value={veg} type="number"/> 
                            </div>
                    <div className="form-group" className="col-sm-3">
                        <label>&#127831; Non-Veg :</label>
                        <input name="nonveg" onChange={this.onChanged} className="form-control" placeholder="Enter Quantity of Non-Veg"
                        value={nonveg} type="number" />  
                    </div>
                    <div className="form-group" className="col-sm-3">
                        <label>&#127870; Drinks :</label>
                         <input name="drinks" onChange={this.onChanged} className="form-control" placeholder="Enter Quantity of Drinks"
                            value={drinks} type="number"  /> 
                    </div>
                    </lable></div>
                    <br/><br/><br/><br/>
                    <div className="form-group" className="col-sm-offset-1">&nbsp; &nbsp;&nbsp; 
                        <input onChange={this.onChanged} type='checkbox' required/>By registering, I accept the <a href='/termsandcondn2'>Terms & Conditions</a>
                    </div><br/>
                    <div className="col-md-offset-4 ">
                    <button className="btn btn-success " type="submit" onClick={e =>
        window.confirm("Are you sure, you wish to register this event?") &&
        this.onSubmit(e)}>
                  &nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;             
                        </button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={this.cancelClick} className="btn btn-danger">
                   &nbsp;&nbsp;&nbsp;Cancel&nbsp;&nbsp;&nbsp;             
                        </button>
                </div>
                </form>
            </div>
            </div>
            </div>
        )
    }
}

export default EventRegistration;


