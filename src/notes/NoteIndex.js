import React, {useState, useEffect} from 'react';
import { Container, Row, Button } from 'reactstrap';
import NoteEdit from './NoteEdit';
import NoteTable from './NoteTable';
import NoteAdd from './NoteAdd';
import NotePhoto from './NotePhoto';


const NoteIndex = (props) => {
    const [notes, setNotes] = useState([]);
    const [updateActive, setUpdateActive] = useState(false); 
    const [updateActivePhoto, setUpdateActivePhoto] = useState(false);
    const [noteToUpdate, setNoteToUpdate] = useState({});
    const [editPhoto, setEditPhoto] = useState({});

    const fetchNotes = () => {
        fetch('http://localhost:3000/notes/myNotes', {
            method: 'GET',
            headers: new Headers ({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${props.token}`//won't have this until after user stuff is done
            })
        }).then( (res) => res.json())
        .then((noteData) => {
            setNotes(noteData)
        })
    }

    const editUpdateNote = (note) => {
        setNoteToUpdate(note);
        console.log("noteToUpdate " + note);
        console.log(editPhoto)
    }

    const getPhoto = (note) => {
        setEditPhoto(note.id);
        console.log("noteIndex note id" + note.id);
        
    } 

    const updatePhotoOn = () => {
        setUpdateActivePhoto(true);
    }

    const updatePhotoOff = () => {
        setUpdateActivePhoto(false);
    }

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

useEffect(() => {
    fetchNotes();
}, [])
return(
    <Container>
        <Button id="logoutBtn" size="sm" onClick={props.clickLogout}>Logout</Button>
        <Row>
            <NoteAdd fetchNotes={fetchNotes} token={props.token} />
            <NoteTable notes={notes} editUpdateNote={editUpdateNote} getPhoto={getPhoto} updateOn={updateOn} updatePhotoOn={updatePhotoOn} fetchNotes={fetchNotes} token={props.token} />
            {updateActive ? 
            <NoteEdit noteToUpdate={noteToUpdate} updateOff={updateOff} token={props.token} fetchNotes={fetchNotes}/>: <> </>}
            {updateActivePhoto ? 
            <NotePhoto editPhoto={editPhoto} updatePhotoOff={updatePhotoOff} token={props.token} fetchNotes={fetchNotes}/> :<> </>}
        </Row>
    </Container>
)
}

export default NoteIndex;
