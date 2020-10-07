import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
class Footer extends Component {
   
    render() { 
        return ( <div><div className="text-center">
        <hr/>
        <b><em style={{color:'purple'}} > Follow us on</em></b><br/><br/>
        <SocialIcon url="https://www.facebook.com/festivity.cg.7"/> &nbsp; &nbsp;
         <SocialIcon url="https://www.instagram.com/festivity.cg/"/><br/><br/>
         <ul > 
                <li >
                <Link to="/about" className="text-center"> About</Link> |
                <Link to="/contactus" className="text-center"> Contact </Link> |
                <Link to="/privacy" className="text-center"> Privacy</Link> |
                <Link to="/terms" className="text-center"> Terms of Use</Link> |
                <Link to="/help" className="text-center"> Help</Link></li>
                </ul> 
                    
                    </div>
                    <footer class="page-footer font-small mdb-color darken-3 pt-4">
                   
           <div className="footer-copyright text-center py-3" style={{color:'purple'}}>
            © 2020 Copyright:
       <b><a className="copyright" href="https://www.festivity.com/"> festivity.com</a></b>
       </div>
      </footer>
      </div> );
    }
}
 
export default Footer;