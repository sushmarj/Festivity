import React, { Component } from 'react';
import QuickReply from './QuickReply';

import Bot from '../img/elsa2.jpg';
const MAX_ITEMS = 3;
class QuickReplies extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
        this.state ={
            n : new Date().toLocaleTimeString(),
            isOpen: false
          }
    }

    _handleClick(event, payload, text) {
        this.props.replyClick(event, payload, text);
    }

    renderQuickReply(reply, i) {
        return <QuickReply key={i} click={this._handleClick} reply={reply} />;
    }

   
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }
        renderQuickReplies(quickReplies) {
        if (quickReplies) {
            return quickReplies.map((reply, i) => {
                    return this.renderQuickReply(reply, i);
                }
            )
        } else {
            return null;
        }
    }
    //   renderQuickReplies=(quickReplies)  =>{
    //     if (this.state.isOpen) {
    //         if(quickReplies){
    //         return quickReplies.map((reply, i) => {
    //                 return this.renderQuickReply(reply, i);
    //             }
    //         )
    //     } else {
    //         return null 
           
    //     }
    // }
    // return quickReplies.slice(0, MAX_ITEMS);;
       
    //   }
    render() {
        return (
            
                  <div >
                    
                    <div className="col-sm-offset-1 row valign-wrapper">
                        <img src={Bot} alt="" className="circle responsive-img"/> <br/><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;       
                            {/* <a href="/" className="btn-floating btn-large waves-effect waves-light red">{this.props.speaks}</a> */}
                        <div id="quick-replies">
                        <div className=" row valign-wrapper">
                      
                        <div className=" msg_container green lighten-5 z-depth-1">
                            {this.props.text && <p className="p1class"> 
                                {this.props.text.stringValue}
                            </p>
                            }
                       
                            {this.renderQuickReplies(this.props.payload)}
                           <br/>  <a  onClick={this.toggle}>
          {this.state.isOpen ? 'View less' : 'View more'}
         &nbsp; &nbsp;<span className=" glyphicon glyphicon-chevron-down"> </span></a>
                         <span style={{color:'black'}} className="msg_time">  {this.state.n}
                            </span>
                            
                        </div>
                       
                    </div> <button className="btn btn-info btn-circle "  type="submit">
                      <span className=" glyphicon glyphicon-thumbs-up "> </span>
                    </button> 
                    <button className="btn btn-info btn-circle "  type="submit">
                      <span className=" glyphicon glyphicon-thumbs-down "> </span>
                    </button> 
                </div>
                </div>
                </div>
            
        );
    }

}



export default QuickReplies;