import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import axios from 'axios';

const history = createHistory();
class AddEvent extends Component {
    constructor() {
        super();
        this.serviceUrl = "http://localhost:5000/api/event/";
        this.state = {
            loggedIn: false,
            post: [{
                eventname: "",
                start: "",
                end: "",
                startt: "",
                endt: "",
                eventcreated: "",
                image: " ",
                location: "",
                adultprice: "",
                childprice: "",
                vegprice: "",
                nonvegprice: "",
                drinksprice: "",
                startbook: "",
                endbook: "",

                description: ""
            }]
        }

    }
    getBase64 = (e) => {
        var file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            this.setState({
                image: reader.result
            })
            this.state.post.image = this.state.image;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    }
    onChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.file.value })
    }
    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (event) => {
                this.setState({ image: URL.createObjectURL(event.target.files[0]) });
            };

        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);


        this.props.history.push('/');

        window.location.reload();
        let newPost = [...this.state.post];
        let newpost = {
            eventname: this.state.eventname,
            start: this.state.start,
            end: this.state.end,
            startt: this.state.startt,
            endt: this.state.endt,
            eventcreated: Date(),
            image: this.state.image,
            location: this.state.location,
            adultprice: this.state.adultprice,
            childprice: this.state.childprice,
            vegprice: this.state.vegprice,
            nonvegprice: this.state.nonvegprice,
            drinksprice: this.state.drinksprice,
            startbook: this.state.startbook,
            endbook: this.state.endbook,

            description: this.state.description
        }

        axios.post(this.serviceUrl, newpost).then((res) => {
            newPost.push(newpost);
            this.setState({ post: newPost });
        })

    }
    componentDidMount() {
        let _id = this.props.match.params._id;
        axios.get(this.serviceUrl).then((res) => {
            this.setState({
                event: res.data
            })
        })
        const cookieName = document.cookie.split(";").slice("=")[0].split("=")[0];
        if (cookieName === "admin") {
            this.setState({
                loggedIn: true,
            });
        }

    }
    cancelClick = () => {
        this.props.history.push('/');
    }
    render() {
        const { eventname, start, end, startt, endt, image, location, adultprice, childprice, vegprice, nonvegprice, drinksprice, startbook, endbook, description } = this.state;
        return (
            <div>
                {this.state.loggedIn ?
                    <div className="row">
                        <div className="col-sm-offset-2 col-sm-8">
                            <div className="well"  >
                                <h2 className="text-center" >Create a Event</h2> <hr />

                                <form >
                                    <div className="form-group" className="col-sm-offset-1 col-sm-5"  >
                                        <label>&#127872; Event Name :</label>
                                        <input name="eventname" onChange={this.onChanged}
                                            value={eventname} type="text" className="form-control" placeholder="Enter the Event Name" required />
                                    </div>
                                    <div className="form-group" className="col-sm-5">
                                        <label>&#128205; &#127757; Location :</label>
                                        <input name="location" onChange={this.onChanged}
                                            value={location} type="text" className="form-control" placeholder="Enter location" required />
                                    </div>
                                    <div className="form-group" className="col-sm-offset-1 col-sm-10">
                                        <label><br />&#128221; Description :</label>
                                        <input name="description" onChange={this.onChanged}
                                            value={description} type="text" className="form-control" placeholder="Enter Description about the Event" required />
                                    </div>

                                    <div className="input-group" className="col-sm-offset-1 col-sm-10">
                                        <label><br />&#127750; Image :
                    <input type="file" className="input-file col-sm-offset-4 col-sm-8" name="image" src="/images" onChange={this.getBase64} placeholder="Enter the address of image" required />
                                        </label></div>

                                    <br /><br /><br />
                                    <br /><br /><br /><br /><br /><br /><br />
                                    <div><br /><lable><b className="col-sm-offset-1">&nbsp; &nbsp;Event Date and Time</b> <br />
                                        <div className="form-group" className="col-sm-offset-1 col-sm-3">
                                            <label>&#128197; Start Date </label>
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
                                                value={startt} type="String" className="form-control" placeholder="_ _:_ _ " required />
                                        </div>
                                        <div className="form-group" className="col-sm-2">
                                            <label>&#8987; End Time </label>
                                            <input name="endt" onChange={this.onChanged}
                                                value={endt} type="String" className="form-control" placeholder="_ _:_ _" required />
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
                                                value={adultprice} type="number" className="form-control" placeholder="Price for adult" />
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
                                    <div className="text-center">
                                        <button className="btn btn-primary" type="submit" onClick={e =>
                                            window.confirm("Are you sure, you wish to add this event?") &&
                                            this.onSubmit(e)}>
                                            &nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;
                    </button> &nbsp;&nbsp;&nbsp;
                    <button onClick={this.cancelClick} className="btn btn-danger">
                                            &nbsp;&nbsp;&nbsp;Cancel&nbsp;&nbsp;&nbsp;
                        </button></div>
                                </form>
                            </div>
                        </div></div> : null}
            </div>
        )
    }
}
export default AddEvent;
