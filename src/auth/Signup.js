import React, {useState} from 'react';
import {Form, FormGroup, Input, Button} from 'reactstrap';

// Create variables in order to pull information from the DOM (props)
// and set it up to be easily usable within the fetch.  Fetch from the user
// create endpoint that we created in our server.  Use the POST method 
// just as we did for this end point server side.  Parses the response into JSON.
// Create the variable token to store it.  Next we access the localStorage for the
// current domain we are using and use the setItem method to se the sessionToken in
// local storage to be tiken generated by our server. 

// Note that we've added email and password to our state.  These state variables
// will allow us to respond to and control the display of the user-typed information
// into the input fields in our form we return from this component.

// Each time the user types inside of the input, we want the state to change.

// We are taking in an event and we are preventing default, which in this
// instance will prevent the page from refreshing when we submit the form.

const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, password);
        fetch("http://localhost:3000/user/create", {
            method: 'POST', 
            body: JSON.stringify({user:{email: email, password: password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.token)
            console.log(data.token)
            console.log(data)
        })
    };

    return(
        <div> 
            <h4 className="signupHeader">create an account</h4>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email} type="email" placeholder="email" className="formInputEmail" required/>
                </FormGroup>
                <FormGroup>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" type="password" value={password} placeholder="password" className="formInputPassword" minlength="5"/>
                </FormGroup>
                <Button type="submit" className="modalSignupBtn">Sign Up</Button>
                
            </Form>
        </div>
    );
};

export default Signup;