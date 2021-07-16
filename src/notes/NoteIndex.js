import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import NoteEdit from './NoteEdit';
import NoteTable from './NoteAdd';
import NoteCreate from './NoteCreate';


const NoteIndex = (props) => {
    const [notes, setNotes] = useState([]);
    const [updateActive, setUpdateActive] = useState(false); 
    const [noteToUpdate, setNoteToUpdate] = useState({});

    const fetchNotes = () => {
        fetch('http://localhost:3000/notes/', {
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
        <Row>
            <Col md="3">
                <NoteTable notes={notes} editUpdateNote={editUpdateNote} updateOn={updateOn} fetchNotes={fetchNotes} token={props.token} />
                
            </Col>
            {updateActive ? <NoteEdit noteToUpdate={noteToUpdate} updateOff={updateOff} token={props.token} fetchNotes={fetchNotes}/>: <> </>}
            
        </Row>
    </Container>
)
}

export default NoteIndex;
