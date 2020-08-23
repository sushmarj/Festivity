import React from 'react';

const Row =(props)=> {
    return(
        <tr key={props._id}>
          
            <td>{props.eventname}</td>
           
           
        
        </tr>
    )
}

export default Row ;

