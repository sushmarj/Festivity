import React, { Component } from 'react';
import axios from 'axios';
import eventdetails from '../Event/EventDetails'
import Pagination from '../Event/Pagination';
import { SocialIcon } from 'react-social-icons';
import image from '../Event/images/1.jpg'
import image1 from '../Event/images/2.jpg'
import image2 from '../Event/images/4.jpg'
import image3 from '../Event/images/1.jfif'
import image4 from '../Event/images/3.jpg'
import image5 from '../Event/images/4.jpg'
import image6 from '../Event/images/4.jfif'
import image7 from '../Event/images/5.jpg'
import image8 from '../Event/images/6.jfif'
import image9 from '../Event/images/7.jpg'
import image10 from '../Event/images/8.jpg'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Chat from '../layout/Chatbot/Chat';
class Home extends Component {
    constructor() {
        super();
        this.serviceUrl = "http://localhost:5000/api/event";
        this.state = {
            event: [],activePage: 2, pageOfItems:3, today:[],
            loggedIn: false,

        }
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    componentDidMount() {
        axios.get(this.serviceUrl).then((res) => {
            this.setState({ event: res.data });

        })



    }
    showdate = ()=>{
        const today= this.state.event.start;
        this.state.event.start=new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today);
    }
    showDetails = (_id) => {

            this.props.history.push('/event/' + _id);

    }

    render(){
      const setting ={
        dots :true,
        fade :true,
        infinite: true,
        speed : 540,
        slidesToShow: 1,
        arrows :true,
        slidesToScrol:1,
        className:"slides"
      }
        return(
            <div>
            <div className="container">
               <div className="row " >

                <h2 className="text-center" style={{color:'purple'}}>⋆  🎀  𝒲𝑒𝓁𝒸💞𝓂𝑒 𝓉🏵 𝐹𝑒𝓈𝓉𝒾𝓋𝒾𝓉𝓎  🎀  ⋆
                <div className="sidenav nav navbar-nav navbar-right">
                <SocialIcon url="https://www.facebook.com/festivity.cg.7"/> &nbsp;
                <SocialIcon url="https://www.instagram.com/festivity.cg/"/></div></h2>
                </div>
                       <hr/>
<Slider {...setting}> <div className="col-sm" >
<img className="img-rounded img-fluid" src={image} alt="Not found" width="100%" height='350'  />
          </div>
          <div className="col-sm">
          <img  className="img-rounded img-fluid"  src={image1} alt="Not found" width="100%" height='350'/>
          </div>
          <div className="col-sm">
          <img  className="img-rounded img-fluid" src={image2} alt="Not found" width="100%" height='350'/>
          </div >
          <div className="col-sm">
          <img  className="img-rounded img-fluid" src={image3} alt="Not found" width="100%" height='350'/>
          </div>
          <div className="col-sm">
          <img  className="img-rounded img-fluid" src={image4} alt="Not found" width="100%" height='350'/>
          </div>
          <div className="col-sm">
          <img  className="img-rounded img-fluid" src={image5} alt="Not found" width="100%" height='350'/>
          </div>
          <div className="col-sm">
          <img  className="img-rounded img-fluid" src={image6} alt="Not found" width="100%" height='350'/>
          </div>
          <div className="col-sm">
          <img  className="img-rounded img-fluid" src={image7} alt="Not found" width="100%" height='350'/>
          </div>
          <div className="col-sm">
          <img  className="img-rounded img-fluid" src={image8} alt="Not found" width="100%" height='350'/>
          </div>
          <div className="col-sm">
          <img  className="img-rounded img-fluid" src={image9} alt="Not found" width="100%" height='350'/>
          </div>
          <div className="col-sm">
          <img  className="img-rounded img-fluid" src={image10} alt="Not found" width="100%" height='350'/>
          </div>
          </Slider>
<br/>
                {this.state.event.map((j, i) =>
                <div className=" col-sm-4 " style={{color:'white'}}>

                    <div className="well well-thumbnail" width="100%" height="40" style={{background:'black'}}>
                        <img id="target" className="img-rounded" src={j.image} alt="not found" width="100%" height="200"/>
                        <br/><b>{j.eventname}</b><br />
                        <b>Event Date and Time</b> &nbsp;&nbsp;{j.start} &nbsp;&nbsp;
                        {j.end} <br/>

                        <div className="text-center col-md-offset-5 col-sm-offset-5">{j.startt} &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        {j.endt}
                        </div>

                        <b>Venue</b> {j.location}<br/><br/>
        <button className="btn btn-info btn-block"  onClick={() => this.showDetails(j._id)}>Show More Details</button> <br/>
        </div>
        </div>)}

        </div>



         </div>
        );
}
}
export default Home;