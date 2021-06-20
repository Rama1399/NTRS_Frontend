import React, { Component }  from 'react';
import {withRouter} from 'react-router-dom'


class Account extends Component{
    constructor(props){
        super(props);
        this.state={
            name:''
        }
    }

    render()
    {
        return (
            <div className="text-center">
                <h1>account</h1>
            </div>
        )
    }
}
export default withRouter(Account);