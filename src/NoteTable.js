import React from 'react';
import { Table, Button } from 'reactstrap';

const NoteTable = (props) => {

    const deleteNote = (note) => {
        fetch(`http://localhost:3000/notes/${note.id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
    .then(() => props.fetchNotes())
    }

    return props.note.map((note, index) => {
        return(
            <tr key={index}>
                <th scope="row">{note.id}</th>
                <td>{note.result}</td>
                <td>{note.plantName}</td>
                <td>{note.note}</td>
                <td>
                    <Button onClick={() => {editNote(note); props.updateOn()}}>edit</Button>
                    <Button onCLick={() => {deleteNote(note)}}>delete</Button>
                </td>
                </tr>
        )
    })
}

export default NoteTable;