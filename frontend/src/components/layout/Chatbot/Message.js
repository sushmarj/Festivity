
import React, { Component } from 'react';
import Bot from '../img/elsa2.jpg';

class Message extends Component {
  
  constructor(props) {
    super(props);
    this.state ={
      n : new Date().toLocaleTimeString(),
      bgColor: ""
    }
  }
  boxClick = (e) => {
    this.setState({
      bgColor: "blue"
    })
  }
  render() {
    return (
        
        <div >
        <div className="msgarea" >
            
                    {/* {props.speaks==='bot' &&
                    <div className="col s2">
                     <a href="/" className="btn-floating btn-large waves-effect waves-light btn lighten-2">{props.speaks}</a> 
                    </div>
                    } */}
                    
                   
                    {this.props.speaks==='bot' &&
                  <div className="text-justify">
                 <div className="row valign-wrapper">
                 <img src={Bot} alt="not found" class="circle responsive-img"/> 
                 
                 <div className="msgarea">
                  <div className="row ">
                  <div className="msg_container green lighten-5 z-depth-1">
                   <div className="card-content">
                       <p className="p1class">{this.props.text}
                  <span style={{color:'Black'}} className="msg_time" > {this.state.n} </span>
                </p> 
                      </div>
                    </div>
                    </div><button className="btn btn-info btn-circle "  type="submit">
                      <span className=" glyphicon glyphicon-thumbs-up "> </span>
                      
                    </button> 
                    <button className="btn btn-info btn-circle "  type="submit">
                      <span className=" glyphicon glyphicon-thumbs-down "> </span>
                    </button> 
               
                    </div> 
                 </div>
                 </div>
                 
                 
                    }
                  
                </div>
               
                 <div>
                 {this.props.speaks==='me' &&
                
                <div className="row">
                <div >
                <div className="row valign-wrapper">
                 <div className=" right blue lighten-5 z-depth-1">
                   <div className="card-content">
                      {/* <a href="/" className="btn-floating btn-large waves-effect waves-light orange">{props.speaks}</a>  */}
                      
                       <p className=" p1class">{this.props.text} <br/>
                        <span className="msg_time">  {this.state.n}</span> <br/></p>   
                     
                  </div>  
                  </div> 
                  
                 </div> 
                 </div>
              </div>
                
                   }
                 </div>   
                 </div>
     
   
    );
                  }
};

export default Message;