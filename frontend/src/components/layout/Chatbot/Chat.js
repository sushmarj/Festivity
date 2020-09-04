import React, { Component } from 'react';
import elsa from '../img/elsa.jpg'
import elsa2 from '../img/elsa2.jpg'
import chat from '../img/chat.png'
import ReactSpeech from '../lib/components/ReactSpeech'
import axios from 'axios/index';
import Message from './Message';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import Card from './Card';
import QuickReplies from './QuickReplies';

const cookies = new Cookies();
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            showBot: false,
            isRecording: false,
            blobURL: '',
            isBlocked: false,
            content: '',
            n: new Date().toLocaleTimeString()
          }
          if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }
        console.log(cookies.get('userID'));
    }
    onTextCallback=(text)=> {
        console.log('Text received:', text);
        this.setState({
          content: text,
          words: text.split(/\S+/g).length
        })
        console.log('State:', this.state);
      }
      show=(event)=> {
        // alert("calling show");
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showBot: true });
    }

    hide=(event)=> {
        // alert("calling");
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showBot: false });

    }
    _handleInputKeyPress=(e)=> {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

    async df_text_query(queryText) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: queryText
                }
            }
        }
        this.setState({ messages: [...this.state.messages, says] });
        const res = await axios.post('/api/df_text_query', { text: queryText, userID: cookies.get('userID') });

        for (let msg of res.data.fulfillmentMessages) {
            console.log(JSON.stringify(msg));
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says] });
        }

    };
    async df_event_query(eventName) {

        const res = await axios.post('/api/df_event_query', { event: eventName, userID: cookies.get('userID') });

        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bot',
                msg: msg
            }

            this.setState({ messages: [...this.state.messages, says] });
        }
    };


    componentDidMount() {
        navigator.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                this.setState({ isBlocked: true })
            },
        );
    }
    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        //this.talkInput.focus();

        if (this.talkInput) {
            this.talkInput.focus();
        }
    }
    getBase64=(e)=> {
        var file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.setState({
            image: reader.result
          })
          this.state.post.image=this.state.image;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
      }
    refresh=(event)=>{
        event.preventDefault();
        window.location.reload();
    }
    renderCards(cards) {
        return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
    }

    renderOneMessage(message, i) {

        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
        } else if (message.msg && message.msg.payload.fields.cards) { //message.msg.payload.fields.cards.listValue.values

            return <div key={i} >
                <div style={{ width: 388 }} className="card-panel grey lighten-5 z-depth-1">
                    <div style={{ overflow: 'hidden' }}>
                        <div className="col-sm">
                            {/* <a href="/" className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a> */}
                        </div>
                        <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
                            <div style={{ height: 300, width: message.msg.payload.fields.cards.listValue.values.length }}>
                                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else if (message.msg &&
            message.msg.payload &&
            message.msg.payload.fields &&
            message.msg.payload.fields.quick_replies
        ) {
            return <QuickReplies
                text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
                key={i}
                replyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
                payload={message.msg.payload.fields.quick_replies.listValue.values} />;
        }
    }

    _handleQuickReplyPayload=(event, payload, text)=> {
        event.preventDefault();
        event.stopPropagation();

        // this.df_text_query(text);

        switch (payload) {
            /*case 'recommended_yes':
                this.df_event_query('SHOW_RECOMMENDATIONS');
                break;*/
            case 'select_nkp':
                this.df_event_query('nkp');
                break;
            default:
                this.df_text_query(text);
                break;
        }

    }

    renderMessages(returnedMessages) {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                /* if (message.msg && message.msg.text && message.msg.text.text) {
                     return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
                 }
                 else {
                     return <h2>Cards</h2>;
                 }*/
                return this.renderOneMessage(message, i);
            }
            )
        } else {
            return null;
        }

    }

    render() {
            if (this.state.showBot) {
                return (
                    <div style={{ float:"right", bottom:0 }} className=" chatboxside">
                        <nav className="chatbox">
                            <div className="nav-wrapper">

                                <img src={elsa} alt="not found" width="50" className="img-circle responsive-img" />
                                <img src={chat} alt="not found" width="50" className="img-circle responsive-img" />
                               <a href="/" className="brand-logo">Ask Elsa</a>


                                   <a href="/" onClick={this.hide}><span style={{position:"fixed",zindex: 1, top: 120,right: 100}} className=" btn glyphicon glyphicon-minus" > </span>  </a>
                                   <a href="/" onClick={this.show}><span style={{position:"fixed",zindex: 1, top: 120,right: 60}} className=" btn glyphicon glyphicon-fullscreen" > </span>  </a>
                                   <a href="/" onClick={this.onClose}><span style={{position:"fixed",zindex: 1, top: 120,right: 20}} className=" btn glyphicon glyphicon-remove" > </span>  </a></div>

                        </nav>

                        <div id="chatbot" style={{ minHeight: 388, maxHeight: 388, width: 450, overflow: 'auto' }} >
                            <div className="msgarea"><h4 >Hi !</h4>
                                <b>This is Elsa, your personal digital assistant for anything and everything related to Event.
                                <div className="well">

                                    Get started by asking <br/><br/>
                                    <button className="btn btn-default">Booking Issue</button>
                                    <button className="btn btn-default">Payment Issue</button>
                                    <button className="btn btn-default">Not Mentioned </button> <b>&#x272a;</b> &nbsp;
                                </div>

                                </b>



                                {this.renderMessages(this.state.messages)}

                                <br/>

                                <div ref={(el) => { this.messagesEnd = el; }}
                                    style={{ float: "left", clear: "both" }}>


                                </div>
                            </div>

                            <div className="input-group">
                            <div className="box" >

            <div className="input-group" >

            <input className="form-control" name="text" value={this.state.content || this.talkInput} placeholder="type a message:" onKeyPress={this._handleInputKeyPress} id="user_says" type="text" />
                <span class="input-group-btn">

                <button className="btn btn-info btn-circle"><span className=" glyphicon glyphicon-camera"> </span></button>
                               &nbsp;  <label className="btn btn-info btn-circle glyphicon glyphicon-paperclip">
                            <input type="file" style={{display:'none'}}  onChange={this.getBase64}/></label>
                            <button className="btn btn-info btn-circle" onClick={this.refresh}><span className=" glyphicon glyphicon-refresh"> </span></button>

                </span>
                <span style={{color: "red"}}></span>
                    </div>
                     </div> <span className="text-center input-group-btn">
                    <ReactSpeech  onText={this.onTextCallback} /> </span> </div>   <br/>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="col-sm-offset-11 sidenav1" >
                                <img src={elsa2} alt="not found" width="60" height="80" className="img-circle" /> <br/>
                                <a onClick={this.show}>Ask Elsa</a>

                        <div ref={(el) => { this.messagesEnd = el; }}
                            style={{ float: "left", clear: "both" }}>
                        </div>
                    </div>
                );
            }
        }
    }

export default Chat;