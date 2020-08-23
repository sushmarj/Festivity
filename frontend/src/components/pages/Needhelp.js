import React, { Component } from 'react';
import axios from 'axios'

class Needhelp extends Component {
    constructor() {
        super();
        this.serviceUrl = "http://localhost:5000/api/help";
        this.state = {
            help:[{
            username: '',
            issue: '',
            email: '',
            mobileno:''  
        }]
        }
    }

    onChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
     
        let newPost=[...this.state.help];
            let newpost={
                username:this.state.username,
                issue:this.state.issue,
                email:this.state.email,
                mobileno:this.state.mobileno
            }
            axios.post(this.serviceUrl,newpost).then((res)=>{
                newPost.push(newpost);
                this.setState({help:newPost});
            })
            alert("Will get in touch soon")
            this.props.history.push('/');
        }
    componentDidMount() {
      
        axios.get(this.serviceUrl).then((res) => {
           this.setState({
              help: res.data
           })
        })
      }
      
    render() { 
        const { username, issue, email,mobileno } = this.state;
        return ( 
            <div className="row">
            <div className="col-sm-offset-3 col-sm-6">

            <div className="col-sm-offset-1 col-sm-10 well" >
           

            <h2 className="text-center">We are here to help you</h2>
            <hr/>
            <form onSubmit={this.onSubmit}>
            <div className="input-group">
            <span className="glyphicon glyphicon-user text-primary"> </span> &nbsp;&nbsp;
            <label>User Name</label>
            </div>
            <div className="form-group" >  
                        
                        <input name="username" className="form-control"  onChange={this.onChanged}
                value={username} type="text" placeholder="Enter valid Name"  required/>
                        
                    </div>

                    <div className="input-group" >
                        <span className="glyphicon glyphicon-eye-open text-primary" ></span> &nbsp;&nbsp;
                            <label> Issue</label> 
                        </div>
            <div className="form-group" >  
                  <textarea name="issue" onChange={this.onChanged} 
                value={issue} type='text'  placeholder="Enter your issues" className="form-control" required />   
                    </div>
                      <div className="form-group" className="col-sm-7">
                      <span className="glyphicon glyphicon-envelope text-primary"></span>
                             <label>&nbsp; Email Id</label>
                                <input name="email" onChange={this.onChanged}
                                     value={email} type="email" className="form-control" placeholder="Enter the Email Id" required/>
                             <span style={{color: "red"}}>{this.state.emailError}</span>
                             </div>
                             <div className="form-group" className="col-sm-5">
                             <span className="glyphicon glyphicon-earphone text-primary"> </span> &nbsp;&nbsp;
                             <label> Mobile Number</label>
                                 <input name="mobileno" onChange={this.onChanged}
                                     value={mobileno} type="Number" className="form-control" placeholder="Enter 10 digits phone Number" required/>
                             </div>
                             <br/>  <br/>  <br/>  <br/>
        <button className="btn btn-success btn-block" type="submit">Sign Up</button>

    </form>
 
        </div>
    </div>
</div>
         );
    }
}
 
export default Needhelp;