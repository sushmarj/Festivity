import React from 'react';
const QuickReply = (props) => {
    if (props.reply.structValue.fields.payload) {
        return (
            <a style={{ margin: 3}} href="/" className=" waves-effect waves-light btn lighten-1"
               onClick={(event) =>
                   props.click(
                       event,
                       props.reply.structValue.fields.payload.stringValue,
                       props.reply.structValue.fields.text.stringValue
                   )
               }> <div className="text-center">
                   
                {props.reply.structValue.fields.text.stringValue}</div>
            </a>
        );
    } else {
        return (
            <a style={{ margin: 3}} href={props.reply.structValue.fields.link.stringValue}
               className="btn-floating btn-large waves-effect waves-light red">
                <div className="col-sm-1">{props.reply.structValue.fields.text.stringValue}</div>
            </a>
        );
    }

};

export default QuickReply;