import React from 'react';
import { Table, Button } from 'reactstrap';;

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
    return(
        <div></div>
    )
}

export default NoteTable;