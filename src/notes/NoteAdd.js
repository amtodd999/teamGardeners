import '../App.css';
import React, { useState } from 'react';
import logo from "../assets/team-gardener-logo.png";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import APIURL from '../helpers/environment';

const NoteAdd = (props) => {
    const [plantName, setPlantName] = useState('');
    const [note, setNote] = useState('');
    const [plantPhoto, setPlantPhoto] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        // fetch('http://localhost:3000/notes/add/', {
        fetch(`${APIURL}/notes/add`, {
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

            <div className="mainDiv">
                add a new plant note!
                <Form className="form" onSubmit={handleSubmit}>
                    <FormGroup>
                        {/* <Label htmlFor="plant_name" />Plant Name
                    <Input name="plant_name" value={plantName} onChange={(e) => setPlantName(e.target.value)} /> */}
                        <Input name="plant_name" type="textarea" id="exampleText" placeholder="Plant name here" className="formInputName" value={plantName} onChange={(e) => setPlantName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        {/* <Label htmlFor="note" />Plant Note
                    <Input name="note" type="textarea" value={note} onChange={(e) => setNote(e.target.value)} /> */}
                        <Input name="note" type="textarea" id="exampleText" placeholder="Plant note here" className="formInputName" value={note} onChange={(e) => setNote(e.target.value)} />
                    </FormGroup>
                    <Button className="submitBtn" type="submit">Click to Save</Button>
                </Form>
            </div>
        </>
    )
}

export default NoteAdd;