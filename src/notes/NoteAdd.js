import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const NoteAdd = (props) => {
    const [plantName, setPlantName] = useState('');
    const [note, setNote] = useState('');

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
            <h3>Record a Plant Note</h3>
            <Form className="form" onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="plant_name" />Plant Name
                    <Input name="plant_name" value={plantName} onChange={(e) => setPlantName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="note" />Plant Note
                    <Input name="note" type="textarea" value={note} onChange={(e) => setNote(e.target.value)} />
                </FormGroup>
                <Button className="button" type="submit">Click to Save</Button>
            </Form>
        </>
    )
}

export default NoteAdd;