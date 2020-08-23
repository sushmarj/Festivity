import React, { Component } from 'react';
import '../components/Test.css'
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            post:[{
                width: 900,
                height:500
            }],

            initialCount :0,
            count:0
         }
    }
    onChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value 
         });
        
    }

    onClick=(event)=>{
        event.preventDefault();
        let newPost=[...this.state.post];
                let newpost={
                    width:this.state.width%2,
                    height:this.state.height%2}
                    newPost.push(newpost);
                this.setState({post:newPost});
     if(this.state.count<20)
     
        this.setState(
            {
                count: this.state.count+ 1  
            
            })
            this.setState(
                {array:this.state.count})
               
            
         console.log(this.state.array)
          

    }
    render() {
        const {count}= this.state;
        return (
            <div className="col-sm-offset-2 col-sm-8"> <br/><br/>
                <div className="table table-bordered" style={{width:900, height:500}}>  
                
                </div>
                <button onClick={this.onClick}>Click </button> &nbsp;
                Count {count} 
            </div>
        );
    }
}
 
export default Test;