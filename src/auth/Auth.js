import React from 'react';
import Login from './Login';


const Auth = (props) => {
    return(
        <div>
                    <Login updateToken={props.updateToken}/>
        </div>
    )
}

export default Auth;