import React, { Component } from 'react';
import axios from 'axios';

export class EditEvent extends Component {

    constructor(props) {
        super(props);
        this.serviceUrl = "http://localhost:5000/api/event/";
        this.state = {
            _id: '',
            eventname: "",
            start: "",
            startt: "",
            end: "",
            endt: "",
            location: "",
            image: "",
            adultprice: "",
            childprice: "",
            vegprice: "",
            nonvegprice: "",
            drinksprice: "",
            startbook: "",
            endbook: "",

            description: "",
            loggedIn: false,
        }
    }

    componentDidMount() {
        const cookieName = document.cookie.split(";").slice("=")[0].split("=")[0];
        if (cookieName === "admin") {
            this.setState({
                loggedIn: true,
            });
        }
        let _id = this.props.match.params._id;
        axios.get(this.serviceUrl + _id).then((res) => {
            this.setState({
                _id: res.data._id,
                eventname: res.data.eventname,
                start: res.data.start,
                startt: res.data.startt,
                end: res.data.end,
                endt: res.data.endt,
                location: res.data.location,
                image: res.data.image,
                adultprice: res.data.adultprice,
                childprice: res.data.childprice,
                vegprice: res.data.vegprice,
                nonvegprice: res.data.nonvegprice,
                drinksprice: res.data.drinksprice,
                startbook: res.data.startbook,
                endbook: res.data.endbook,
                description: res.data.description
            });
        })
    }

    cancelClick = () => {
        this.props.history.push('/event');
    }

    onChanged = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSaveClick = (e) => {
        e.preventDefault();
        axios.put(this.serviceUrl + this.state._id, this.state).then((res) => {
            alert('Data Updated');
            this.props.history.push('/event');
        })
    }

    render() {
        const { loggedIn, _id, eventname, start, end, startt, endt, location, image, adultprice, childprice, vegprice, nonvegprice, drinksprice, startbook, endbook, startbookt, endbookt, description } = this.state;
        return (
            <div className="row">
                {loggedIn ?
                    <div className="col-sm-offset-2 col-sm-8">
                        <div className="well"  >
                            <h2 className="col-md-offset-4" >Update an Event</h2> <hr />

                            <form  >
                                <div className="form-group" className="col-sm-offset-1 col-sm-5"  >
                                    <label>&#127872; Event Name :</label>
                                    <input name="eventname" onChange={this.onChanged}
                                        value={eventname} type="text" className="form-control" />
                                </div>
                                <div className="form-group" className="col-sm-5">
                                    <label>&#128205; &#127757; Location :</label>
                                    <input name="location" onChange={this.onChanged}
                                        value={location} type="text" className="form-control" />
                                </div>
                                <div className="form-group" className="col-sm-offset-1 col-sm-10">
                                    <label><br />&#128221; Description :</label>
                                    <input name="description" onChange={this.onChanged}
                                        value={description} className="form-control" />
                                </div>

                                <div className="form-group" className="col-sm-offset-1 col-sm-10">
                                    <label><br />&#127750; Image :<input name="image" value={image} className="form-control" onChange={this.onChanged} />
                                    </label></div>

                                <br /><br /><br />
                                <br /><br /><br /><br /><br /><br /><br />
                                <div><br /><lable><b className="col-sm-offset-1">&nbsp; &nbsp;Event Date and Time</b> <br />
                                    <div className="form-group" className="col-sm-offset-1 col-sm-3">
                                        <label>&#128197; Start Date</label>
                                        <input name="start" onChange={this.onChanged} data-date="" data-date-format="DD MMMM YYYY"
                                            value={start} type="date" className="form-control" placeholder="Enter Start date of Event" required />
                                    </div>
                                    <div className="form-group" className="col-sm-3">
                                        <label>&#128197; End Date </label>
                                        <input name="end" onChange={this.onChanged}
                                            value={end} type="date" className="form-control" placeholder="Enter End date of Event" required />
                                    </div>

                                    <div className="form-group" className="col-sm-2">
                                        <label>&#9203; Start Time </label>
                                        <input name="startt" onChange={this.onChanged}
                                            value={startt} type="String" className="form-control" placeholder="Enter Start Time of Event" required />
                                    </div>
                                    <div className="form-group" className="col-sm-2">
                                        <label>&#8987; End Time </label>
                                        <input name="endt" onChange={this.onChanged}
                                            value={endt} type="String" className="form-control" placeholder="Enter End Time of Event" required />
                                    </div>
                                </lable></div>
                                <br /><br /><br />
                                <div><br /><lable><b className="col-sm-offset-1">&nbsp; &nbsp;Booking Date</b> <br />
                                    <div className="form-group" className="col-sm-offset-1 col-sm-4">
                                        <label>&#128197; Start Date :</label>
                                        <input name="startbook" onChange={this.onChanged}
                                            value={startbook} type="date" className="form-control" placeholder="Enter the start booking Date " />
                                    </div>
                                    <div className="form-group" className="col-sm-offset-2 col-sm-4">
                                        <label>&#128197; End Date :</label>
                                        <input name="endbook" onChange={this.onChanged}
                                            value={endbook} type="date" className="form-control" placeholder="Enter the End booking Date " />
                                    </div>

                                </lable>
                                </div><br /><br />
                                <br />
                                <div><br /><lable><b className="col-sm-offset-1">&nbsp; &nbsp;Entry Price</b> <br />
                                    <div className="form-group" className="col-sm-offset-1 col-sm-4">
                                        <label>&#127915; Adult ticket :</label>
                                        <input name="adultprice" onChange={this.onChanged}
                                            value={adultprice} type="number" className="form-control" placeholder="Price for adult" required />
                                    </div>
                                    <div className="form-group" className="col-sm-offset-2 col-sm-4">
                                        <label>&#127915; Child ticket :</label>
                                        <input name="childprice" onChange={this.onChanged}
                                            value={childprice} type="number" className="form-control" placeholder="Price for child" />
                                    </div>
                                </lable></div><br /><br />
                                <br />
                                <div><br /><lable><b className="col-sm-offset-1">&nbsp; &nbsp;Food Price</b> <br />
                                    <div className="form-group" className="col-sm-offset-1 col-sm-3">
                                        <label>&nbsp;&nbsp; &#127857; Veg :</label>
                                        <input name="vegprice" onChange={this.onChanged}
                                            value={vegprice} type="number" className="form-control" placeholder="Price for Veg" />
                                    </div>
                                    <div className="form-group" className="col-sm-3">
                                        <label>&nbsp;&nbsp; &#127831; Non-veg :</label>
                                        <input name="nonvegprice" onChange={this.onChanged}
                                            value={nonvegprice} type="number" className="form-control" placeholder="Price for Non-veg" />
                                    </div>&nbsp;&nbsp;
                             <div className="form-group" className="col-sm-3">
                                        <label>&nbsp;&nbsp; &#127870; Drinks :</label>
                                        <input name="drinksprice" onChange={this.onChanged}
                                            value={drinksprice} type="" className="form-control" placeholder="Price for Drinks" />
                                    </div>
                                    <br />
                                </lable></div><br /><br />
                                <br />

                                <div className="col-md-offset-4">
                                    <button className="btn btn-primary" type="submit" onClick={e =>
                                        window.confirm("Are you sure, you wish to save edit changes for this event?") && this.onSaveClick(e)}>
                                        &nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;
                             </button> &nbsp;&nbsp;&nbsp;
                             <button onClick={this.cancelClick} className="btn btn-danger">
                                        &nbsp;&nbsp;&nbsp;Cancel&nbsp;&nbsp;&nbsp;
                                 </button></div>
                            </form>
                        </div>
                    </div>
                    : null}
            </div>
        )
    }
}
