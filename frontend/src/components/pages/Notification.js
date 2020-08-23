import React, { Component } from 'react';
import Thead from './Thead';
import TableRow from './TableRow';
import axios from 'axios';

class Notification  extends Component {
    constructor() {
        super();
        this.serviceUrl = "http://localhost:5000/api/event/"; 
        this.state = { 
            event: []
     } 
     this.onChangePage = this.onChangePage.bind(this);
    }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    componentDidMount() {
        axios.get(this.serviceUrl).then((res) => {
           this.setState({
              event: res.data
           })
        })
     }
    render() { 
        return (
            <div className="col-sm-offset-2 col-sm-8">
            <div className="well">
            <h2 className="text-center"> <span className="glyphicon glyphicon-bell text-primary" ></span> Notification of Upcoming events </h2> <hr/>
            <table className="table table-border table-striped ">
                <Thead />
                <tbody style={{background:'lightgrey'}}>
                    {this.state.event.map((i)=>
                    <TableRow key={i.id}
                    _id={i._id}
                    eventname={i.eventname}
                    start={i.start}
                    end={i.end}
                    startbook={i.startbook}
                    endbook={i.endbook}
                   
                   /> )}
                </tbody>
            </table>
            </div> 
            </div>);
    }
}
 
export default Notification;  