import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/pages/Home';

import AddEvent from './components/Event/AddEvent'
import Notification from './components/pages/Notification';
import EventDetails from './components/Event/EventDetails';
import Eventregistration from './components/Event/EventRegistration';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Event from './components/Event/Event'
import { EditEvent } from './components/Event/EditEvent';

import Contactus from './components/pages/Contactus';
import termsandCondn from './components/Event/termsandcondn/termsandcondn';
import termsandCondn2 from './components/Event/termsandcondn/termsandcondn2';
import About from './components/pages/About';
import Needhelp from './components/pages/Needhelp';
import Footer from './components/layout/footer';
import Chat from './components/layout/Chatbot/Chat';



class App extends Component {
  render() {
    return (
      <div style={{ background:'black'}}>
     <Router >
       
       <Header  />
         <div className="container-fluid">
         
         <Switch>
       
           <Route exact path="/" component={Home} />
           <Route exact path="/addEvent" component={AddEvent} />
           <Route exact path="/event" component={Event} />
           <Route exact path="/editevent/:_id" component={EditEvent} />
           <Route exact path="/notification" component={Notification} />
           <Route exact path="/event/:_id" component={EventDetails} />
           <Route exact path="/eventregistration/:_id" component={Eventregistration} />
           
           <Route exact path="/login" component={Login} />
           <Route exact path="/contactus" component={Contactus} />
           <Route exact path="/terms" component={termsandCondn} />
           <Route exact path="/privacy" component={termsandCondn2} />
           <Route exact path="/about" component={About} />
           <Route exact path="/help" component={Needhelp} />
           <Route exact path="/register" component={Register} />
          
         </Switch>
         </div>
         <Chat/>
       <Footer/>
     </Router>
   
    
     </div>
    );
  }
}

export default App;
