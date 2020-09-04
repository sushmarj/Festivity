import React, { Component } from 'react';
import axios from 'axios';
import ListofEvent from './ListofEvent';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

class Event extends Component {

    constructor() {
        super();
        this.serviceUrl = "http://localhost:5000/api/event/";
        this.state = {
            event: [],
            loggedIn: false,
        }
    }
    componentDidMount() {
        axios.get(this.serviceUrl).then((res) => {
            this.setState({ event: res.data })
        })
        const cookieName = document.cookie.split(";").slice("=")[0].split("=")[0];
        if (cookieName === "admin") {
            this.setState({
                loggedIn: true,
            });
        }
    }

    deleteEvent = (task) => {

        axios.delete(this.serviceUrl + task._id).then((res) => {
            let newEvent = [...this.state.event];
            let indexPosition = newEvent.lenght + 1;

            newEvent.splice(indexPosition, 1);
            this.setState({ event: newEvent })
            console.log(newEvent);
        })

        alert("Event is successfully deleted");
        window.location.reload();

    }

    addEmployee = (eventname, start, end, location, adultprice, childprice, food, drinks, description) => {
        let newEvent = [...this.state.event];
        let newTask = {
            id: newEvent.length + 1,
            eventname: eventname,
            start: start,
            end: end,
            location: location,
            adultprice: adultprice,
            childprice: childprice,
            food: food,
            drinks: drinks,
            description: description
        }
        axios.post(this.serviceUrl, newTask).then((res) => {
            newEvent.push(newTask);
            this.setState({ event: newEvent })
        })
    }

    render() {
        return (
            <div>
                {this.state.loggedIn ? <div>
                    <ListofEvent history={history} event={this.state.event}
                        deleteEvent={(task) => { if (window.confirm('Are you sure, you want to delete the Event?')) { this.deleteEvent(task) }; }} />
                </div> : null}
            </div>
        )
    }
}

export default Event;
