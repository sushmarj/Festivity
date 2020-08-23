import React from 'react';
import image from '../Event/images/sushma.jpeg'
import image1 from '../Event/images/sonika.jpeg'
const Contactus=()=> {
    return(
        
            <div style={{color:'pink'}} >
                <br/><br/> <br/>
                
               <h3 className="text-center">Get in Touch </h3> <hr/>
               <div className="row">
               <div className="col-sm-offset-2 col-sm-3">
          <img  className="img-fluid"  src={image} alt="Not found" style={{width:300, height:300}}/><br/>
               👨🏻‍💼 Sponsorships <br/>
                +919916009352   <br/> 
          <a href="https://www.gmail.com">sushma.sushma@capgemini.com</a> <br/>
          </div><div className="col-sm-offset-6 ">
          <img  className="img-fluid"  src={image1} alt="Not found" style={{width:300, height:300}}/><br/>
                👨🏻‍💼 Organiser <br/>
                 +919791068543   <br/>
          <a href="https://www.gmail.com">sonika.s@capgemini.com</a>
          </div></div>
                
            </div>
         )
        }
export default Contactus ;
 
