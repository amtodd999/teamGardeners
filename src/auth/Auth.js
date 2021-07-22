import React from 'react';
import {Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
// import Signup from './Signup';
import Login from './Login';

const Auth = (props) => {
    return(
        <div>
            {/* <Row id="homepage-row1">Welcome to Team Gardener</Row> */}
            {/* <Row> */}
                {/* <Col md="6">
                    <Signup updateToken={props.updateToken}/>
                </Col> */}
                {/* <Col md="6" className="login-col"> */}
                    <Login updateToken={props.updateToken}/>
                {/* </Col>
            </Row> */}
        </div>
    )
}

export default Auth;