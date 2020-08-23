import React from 'react';
import {Link} from 'react-router-dom';
import image from './Logo.jpg';


const Header=()=> {
        return( 
            <nav className="navbar navbar-inverse" >
            <div className="container-fluid">
            <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed"
            data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false" ><span className="sr-only">⋆ 𝐹𝑒𝓈𝓉𝒾𝓋𝒾𝓉𝓎 ⋆</span>
            
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
            </div>
            <div  className="collapse navbar-collapse" id="#bs-example-navbar-collapse-1">
                
                <ul className="nav navbar-nav">
               <li> 
            <Link className="text-center" to="#" ><button style={{background:'lightgrey'}}><img src={image} width="35" height="35"/> </button>&nbsp;<br/> <b> ⋆ 𝐹𝑒𝓈𝓉𝒾𝓋𝒾𝓉𝓎 ⋆</b></Link></li>
                <li ><Link to="/" className="text-center"><span className="btn btn-info   glyphicon glyphicon-home" > </span><br/>Home</Link><span className="sr-only">(current)</span></li>
                <li ><Link to="/addEvent" className="text-center"> <span className="btn btn-info  glyphicon glyphicon-plus-sign -info" > </span><br/> Add Event </Link></li>
                <li ><Link to="/event" className="text-center"> <span className="btn btn-info  glyphicon glyphicon-list-alt " > </span><br/>List of Events </Link></li>
                <li ><Link to="/notification" className="text-center"> <span className="btn btn-info glyphicon glyphicon-bell "> </span><br/> Upcoming Events </Link></li>
               
                </ul>
                
   <ul className="nav navbar-nav navbar-right">
                
                <li ><Link to="/login" className="text-center"> <span className="btn btn-info glyphicon glyphicon-user"> </span><br/> Login</Link></li> 
                <li><Link to="/register" className="text-center"> <span className="btn btn-info glyphicon glyphicon-cloud"> </span><br/> Sign Up</Link></li>
                </ul>
            </div>
            </div>
            </nav>
        )
}

export default Header;