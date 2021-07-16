import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

const NoteEdit = (props) => {
    const [editPlant, setEditPlant] = useState(props.noteToUpdate.plant_name);
    const [editNote, setEditNote] = useState(props.noteToUpdate.note);
    const noteUpdate = (event, note) => {
        event.preventDefault();
        fetch(`http://localhost:3000/notes/${props.noteToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({log: {plant_name: editPlant, note: editNote}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${props.token}`
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjI2Mzk0MzE4LCJleHAiOjE2MjY0ODA3MTh9.M3uNe5rbh0NbR7psjqEjCN2Bl67MhMYCOmgyyGh7CbM'
            })
        }).then((res) => {
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
                    <Label htmlFor="plant">Edit</Label>
                    <Input name="plant" value={editPlant} onChange={(e) => setEditPlant(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="note">Edit</Label>
                    <Input type="select" name="note" value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}/>
                </FormGroup>
                <Button type="submit">Update your plant note</Button>
            </Form>
        </div>
    )
}

export default NoteEdit;