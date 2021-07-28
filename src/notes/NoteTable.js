// import React from 'react';
import { Table, Button } from 'reactstrap';

import React, { useState } from 'react';

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
            // if(props.notes.photo) {
            return (
                <tr key={index}>
                    <td className="plantText"><img className="plantImg" src={note.photo} alt="No image" />
                    </td>
                    <th scope="row" className="plantText">{note.plant_name}</th>
                    <td className="noteText">{note.note}</td>
                    <td>
                        <Button className="editBtn" onClick={() => { props.editUpdateNote(note); props.updateOn() }}>edit</Button>
                        <br />
                        <Button className="deleteBtn" onClick={() => { if (window.confirm('Are you sure you want to delete this note?')) deleteNote(note) }}>delete</Button>
                        <Button className="editBtn" onClick={() => { props.getPhoto(note); props.updatePhotoOn() }}>dumb</Button>
                    </td>
                </tr>
            )
        }
        )

    }

    return (
        <>
            <div className="notesTableDiv">
                <br />
                <Table borderless>
                    <thead>
                        <tr>
                            <th className="noteHeaderText">Photo</th>
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
