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
            return (
                <tr key={index}>
                    {/* <th scope="row">{note.id}</th> */}
                    <th scope="row" className="plantText">{note.plant_name}</th>
                    <td className="noteText">{note.note}</td>
                    <td>
                        <Button className="editBtn" onClick={() => { props.editUpdateNote(note); props.updateOn() }}>edit</Button>
                        <br />
                        <Button className= "deleteBtn" onClick={() => { if(window.confirm('Are you sure you want to delete this note?')) deleteNote(note) }}>delete</Button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
        <div className="notesTableDiv">
            <br />
            <Table borderless>
                <thead>
                    <tr>
                        <th className="noteHeaderText">Plant Name</th>
                        {/* <th>Plant Name</th> */}
                        <th className="noteHeaderText">Plant Note</th>
                    </tr>
                </thead>
                <tbody>
                    {noteMapper()}
                </tbody>
            </Table>
            </div>
        </>
    )
}

export default NoteTable;
