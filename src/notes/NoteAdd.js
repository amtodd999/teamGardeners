import '../App.css';
import React, { useState } from 'react';
import logo from "../assets/team-gardener-logo.png";
import { Button, Form, FormGroup, Input } from 'reactstrap';

const NoteAdd = (props) => {
    const [plantName, setPlantName] = useState('');
    const [note, setNote] = useState('');
    const [plantPhoto, setPlantPhoto] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

            fetch('http://localhost:3000/notes/add/', {
                method: 'POST',
                body: JSON.stringify({ notes: { plant_name: plantName, note: note } }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                })
            }).then((res) => res.json())
                .then((plantData) => {
                    console.log(plantData);
                    setPlantName('');
                    setNote('');
                    props.fetchNotes();
                })
        }
        
    return (
        <>
            <h4 className="signupHeader">record a plant note</h4>
            <Form className="form" onSubmit={handleSubmit}>
                <FormGroup>
                    <Input name="plant_name" value={plantName} onChange={(e) => setPlantName(e.target.value)} placeholder="plant name" className="formInputName" />
                </FormGroup>
                <FormGroup>
                    <Input name="note" type="textarea" value={note} onChange={(e) => setNote(e.target.value)} placeholder="plant note" className="formInputNote" />
                </FormGroup>
                <br/>
                <Button onClick={props.toggle} className="modalSignupBtn" type="submit">save</Button>
            </Form>
        </>
    )
}

export default NoteAdd;