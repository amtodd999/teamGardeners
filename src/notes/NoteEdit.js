import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import APIURL from '../helpers/environment';

const NoteEdit = (props) => {
    const [editPlant, setEditPlant] = useState(props.noteToUpdate.plant_name);
    const [editNote, setEditNote] = useState(props.noteToUpdate.note);

    const noteUpdate = (event, note) => {
        event.preventDefault();
        // fetch(`http://localhost:3000/notes/update/${props.noteToUpdate.id}`, {
            fetch(`${APIURL}/notes/update/${props.noteToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({notes: {plant_name: editPlant, note: editNote}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then((res) => {
            props.fetchNotes();
            props.updateOff();
        })
    }


    return(
        //doing a modal would give ability to open and close
        // <Modal isOpen={true}>
        //     <ModalHeader></ModalHeader>
        // </Modal>
        <div>
            <Form onSubmit={noteUpdate}>
                <FormGroup>
                    <Label htmlFor="plant">Edit Plant Name</Label>
                    <Input name="plant" value={editPlant} onChange={(e) => setEditPlant(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="note">Edit Your Note</Label>
                    <Input name="note" value={editNote} onChange={(e) => setEditNote(e.target.value)}/>
                </FormGroup>
                <Button type="submit">Update your plant note</Button>
            </Form>
        </div>
    )
}

export default NoteEdit;