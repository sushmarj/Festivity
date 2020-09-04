import React from 'react';
import Thead from './Thead';
import TableRow from './TableRow';
import { withRouter } from 'react-router-dom';

const ListofEvent=(props)=> {

    const editClick=(_id)=>{
       
        props.history.push('/editevent/'+_id);
    }
    
        return(
            
            <table  >
                <div className="container-fluid" width="100%">
                <div className="well">
            <h2 className="text-center"><span style={{fontsize:'100px'}}>&#127881;</span> Make change to Event <span style={{fontsize:'100px'}}>&#127882;</span></h2>
              <div className="table table-bordered table-striped">
                <Thead />
               
                <tbody style={{background:'lightgrey'}}>
                    {props.event.map((i,j)=>
                    <TableRow  key={i.id}
                    _id={i._id}
                    eventname={i.eventname}
                    start={i.start}
                    end={i.end}
                    location={i.location}
                    adultprice={i.adultprice}
                    childprice={i.childprice}
                    vegprice={i.vegprice}
                    nonvegprice={i.nonvegprice}
                    drinksprice={i.drinksprice}
                    startbook={i.startbook}
                    endbook={i.endbook}
                    description={i.description}
                    deleteEvent={props.deleteEvent}
                    editClick={editClick} /> )}
                  
                </tbody>
                </div>
            </div>
            </div>
            </table>
        )
}

export default withRouter(ListofEvent) ;
