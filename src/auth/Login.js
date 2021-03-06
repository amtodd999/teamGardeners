import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import logo from "./assets/team-gardener-logo.png";
import Signup from "./Signup";
import APIURL from '../helpers/environment';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(email, password);
        // fetch("http://localhost:3000/user/login", {
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ user: { email: email, password: password } }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.token)
        })
    };

        const {
            className
        } = props;
        const [modal, setModal] = useState(false);

        const toggle = () => setModal(!modal);
        
    
    return(
        <div className="bgDiv">
            <div id="flower">
                 <div id="petalsOne">
                    <div id="p1"></div>
                    <div id="p2"></div>
                    <div id="p3"></div>
                    <div id="p4"></div>
                </div> 
                    <div id="petalsTwo">
                    <div id="p5"></div>
                    <div id="p6"></div>
                    <div id="p7"></div>
                    <div id="p8"></div>
                </div>
            </div>
            <div className="loginDiv" fluid="sm">
            <img src={logo} alt="Team Gardeners Logo" className="logoImgLogin"/>
                <p>Welcome to your plant notebook! Keep notes safe and updated with our handy note keeper! Let the journey of gardening begin!</p>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email} type="email" required placeholder="email" className="formInputEmail" />
                    </FormGroup>
                    <FormGroup>
                        <Input onChange={(e) => setPassword(e.target.value)} name="password" type="password" value={password} required placeholder="password" className="formInputPassword" />
                    </FormGroup>
                        <Button type="submit" className="loginBtn">login</Button>
                        <Button onClick={toggle} className="signUpBtn">sign up</Button>
                    <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader className="modalHeader">
                            <Button onClick={toggle} className="modalCloseBtn">X</Button>
                        </ModalHeader>
                        <ModalBody>
                                <Signup updateToken={props.updateToken}/>

                            </ModalBody>
                    </Modal>
                </Form>
            </div>
        </div>
    );
};

export default Login;