import React from 'react';
import { Table, Button } from 'reactstrap';

const NoteTable = (props) => {

    const deleteNote = (note) => {
        fetch(`http://localhost:3000/notes/delete/${note.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
            .then(() => props.fetchNotes())
    }

    const noteMapper = () => {
        return props.notes.map((note, index) => {
            console.log(props.notes)
            if(props.notes.photo) {
            return (
                <tr key={index}>
                    <th><img src={note.photo} alt="No image" />
                        </th>
                    <th scope="row">{note.plant_name}</th>
                    <td>{note.note}</td>
                    <td>
                        <Button className="button" onClick={() => { props.editUpdateNote(note); props.updateOn() }}>edit</Button>
                        <Button className= "button" onClick={() => { if(window.confirm('Are you sure you want to delete this note?')) deleteNote(note) }}>delete</Button>
                    </td>
                </tr>
            )
            }
            else {
                return (
                    <tr key={index}>
                        <th><Button className="button" onClick={() => { props.getPhoto(note); props.updatePhotoOn() }}>dumb photo</Button>
                            </th>
                        <th scope="row">{note.plant_name}</th>
                        <td>{note.note}</td>
                        <td>
                            <Button className="button" onClick={() => { props.editUpdateNote(note); props.updateOn() }}>edit</Button>
                            <Button className= "button" onClick={() => { if(window.confirm('Are you sure you want to delete this note?')) deleteNote(note) }}>delete</Button>
                        </td>
                    </tr>
                )
            }
        })
    
    }

    return (
        <>
            <h3 >Your Plant Notes</h3>
            <hr />
            <Table striped>
                <thead>
                    <tr>
                        <th>Plant Photo</th>
                        <th>Plant Name</th>
                        <th>Plant Note</th>
                    </tr>
                </thead>
                <tbody>
                    {noteMapper()}
                </tbody>
            </Table>
        </>
    )
}

export default NoteTable;
