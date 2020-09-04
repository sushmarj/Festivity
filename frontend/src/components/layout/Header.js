import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image from './Logo.jpg';

const Header = (props) => {
    const [admin, setAdmin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        document.cookie = 'userID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        const cookieName = document.cookie.split(";").slice("=")[0].split("=")[0];
        const userName = document.cookie.split(";").slice("=")[0].split("=")[1];
        if (cookieName === "admin" || cookieName === "user") {
            setLoggedIn(true);
            setName(userName);
        }
        if (cookieName === "admin") setAdmin(true);
    }, [])

    const logout = () => {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        setLoggedIn(false);


    }

    return (
        <nav className="navbar navbar-inverse" >
            <div className="container-fluid">
                <div>
                    <ul className="nav navbar-nav">
                        <li><Link className=" text-center" to="#" ><button className='btn btn-info btn-circle'>
                        💞 </button>&nbsp;<br /> <b > ⋆ 𝐹𝑒𝓈𝓉𝒾𝓋𝒾𝓉𝓎 ⋆</b></Link></li>
                        <li><Link to="/" className="text-center"><span className="btn btn-info btn-circle  glyphicon glyphicon-home" /><br />
                            Home</Link><span className="sr-only">(current)</span></li>
                        <li><Link to="/notification" className="text-center"> <span className="btn btn-info btn-circle glyphicon glyphicon-bell " /><br />
                            Upcoming Events </Link></li>
                    </ul>
                    {loggedIn && admin && (
                        <ul className="nav navbar-nav">
                            <li><Link to="/addEvent" className="text-center"><span className="btn btn-info btn-circle  glyphicon glyphicon-plus-sign -info" >
                            </span><br /> Add Event </Link></li>
                            <li><Link to="/event" className="text-center"><span className="btn btn-info btn-circle glyphicon glyphicon-list-alt " />
                                <br />List of Events </Link></li>
                        </ul>
                    )}
                    {!loggedIn ? <div>
                        <ul className="nav navbar-nav navbar-right">
                            <li ><Link to="/login" className="text-center">
                                <span className="btn btn-info btn-circle glyphicon glyphicon-user" /><br /> Login</Link></li>
                            <li><Link to="/register" className="text-center">
                                <span className="btn btn-info btn-circle glyphicon glyphicon-cloud" /><br /> Sign Up</Link></li>
                        </ul>
                    </div> : <div>
                            <ul className="nav navbar-nav navbar-right">
                                <li style={{ color: 'white', paddingTop: "15px", fontSize: 20 }}> Hello {name} </li>
                                <li ><Link onClick={logout} className="text-center">
                                    <span className="btn btn-info glyphicon glyphicon-user"> </span><br /> Logout</Link></li>

                            </ul>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Header;