import React, { Component } from 'react';
import { EventRegistration } from './EventRegistration';
import axios from 'axios';
class EventDetails extends Component {
  constructor() {
    super();
    this.serviceUrl = "http://localhost:5000/api/event/";

    this.state = {

      event: [],
      user: []

    }
  }

  componentDidMount() {
    let _id = this.props.match.params._id;
    axios.get(this.serviceUrl + _id).then((res) => {
      this.setState({
        event: res.data
      })
    })

  }

  apply = (_id) => {
    console.log("time" + this.state.event.startt);
    const cookieName = document.cookie.split(";").slice("=")[0].split("=")[0];
    const userName = document.cookie.split(";").slice("=")[0].split("=")[1];

    if (cookieName === "admin" || cookieName === "user") {
      const emailName = document.cookie.split(";").slice("=")[1].split("=")[1];
      this.setState({
        loggedIn: true,
        fullname: userName,
        email: emailName,
      });
    }

    fetch('http://localhost:5000/api/event')
      .then(res => res.json())
      .then(data => {
        for (let index in data)
          console.log(data[index]);
      });
    this.props.history.push('/eventregistration/' + _id);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-offset-2 col-sm-8">
            <div className="well">

              <img className="card-img-top img-fluid img-rounded card card-center " src={this.state.event.image} alt="not found" width="100%" height="300" />
              <h3 className="card-title">{this.state.event.eventname}</h3>
              <h4 className="text-left" > <b>Event dates and Timing : </b> {this.state.event.start}&nbsp;&nbsp;&nbsp;
            {this.state.event.end}&nbsp;&nbsp;&nbsp;
            {this.state.event.startt}&nbsp;&nbsp;&nbsp;

            {this.state.event.endt}</h4>

              <br />

              <button className="col-md-offset-4" className="btn btn-success btn-block" onClick={() => this.apply(this.state.event._id)}>Register</button>
            </div>
            <div className="well">
              <b>Event Description:</b> {this.state.event.description} <br />
              <br />
              <b>Venue Details:</b>{this.state.event.location}<br />
              <br />
              <b>Price for Tickets</b> <br />
              <div className="text-center justify-content-sm-center">
                <b>Adult : </b>{this.state.event.adultprice} Rs
            <b className="col-sm-offset-3" >Child : </b>{this.state.event.childprice} Rs<br />
                <br /></div>
              <b>Price for Food</b><br />
              <div className="text-center justify-content-sm-center">
                <b>Veg food : </b>{this.state.event.vegprice} Rs
            <b className="col-sm-offset-2">Non-veg food : </b>{this.state.event.nonvegprice} Rs
            <b className="col-sm-offset-2">Drinks : </b>{this.state.event.drinksprice} Rs<br /><br />
              </div>
              <b>Booking Date </b><br />
              <div className="text-center justify-content-sm-center">
                <b>Starts on : </b>{this.state.event.startbook}
                <b className="col-sm-offset-2">Ends on : </b>{this.state.event.endbook}<br />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
export default EventDetails;