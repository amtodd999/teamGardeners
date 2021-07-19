import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import logo from "./assets/team-gardener-logo.png";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(email, password);
        fetch("http://localhost:3000/user/login", {
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
        })
    };

    return(
        <div className="bgDiv">
            <div className="loginDiv">
            <img src={logo} alt="Team Gardeners Logo" className="logoImgLogin"/>
                <p>Welcome to your plant notebook! Keep notes safe and updated with our handy note keeper! Let the journey of gardening begin!</p>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email}required placeholder="email" className="formInputEmail"/>
                    </FormGroup>
                    <FormGroup>
                        <Input onChange={(e) => setPassword(e.target.value)} name="password" type="password" value={password} required placeholder="password" className="formInputPassword"/>
                    </FormGroup>
                    <Button type="submit" className="loginBtn">login</Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;