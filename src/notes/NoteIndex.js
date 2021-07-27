import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import NoteEdit from './NoteEdit';
import NoteTable from './NoteTable';
import NoteAdd from './NoteAdd';
import logo from "./assets/team-gardener-logo.png";
import NotePhoto from './NotePhoto';

const NoteIndex = (props) => {
    const [notes, setNotes] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [updateActivePhoto, setUpdateActivePhoto] = useState(false);
    const [noteToUpdate, setNoteToUpdate] = useState({});
    const [sessionToken, setSessionToken] = useState('');
    const [editPhoto, setEditPhoto] = useState({});

    const fetchNotes = () => {
        fetch('http://localhost:3000/notes/myNotes', {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${props.token}`//won't have this until after user stuff is done
            })
        }).then((res) => res.json())
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

    const {
        className
    } = props;
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const clearToken = () => {
        localStorage.clear();
        setSessionToken('');
    }

    useEffect(() => {
        fetchNotes();
    }, [])
    return (

        <div className="bgDiv">

            <img src={logo} alt="Team Gardeners Logo" className="logoImg" />
            <div className="notesViewDiv">
                <div className="noteDivBtn">
                    <Row>
                        <h3>welcome!</h3>
                        <p>keep track of all your gardening and plant progress by adding a note! If you find additional information edit your note, and if you no longer need the information (way to go gardening master!) simply delete it.</p>
                        <Button id="logoutBtn" size="sm" onClick={props.clickLogout} className="logoutBtn">logout</Button>
                        <Button onClick={toggle} className="addNoteBtn">add note</Button>
                        <Modal isOpen={modal} toggle={toggle} className={className}>
                            <ModalHeader className="modalHeader">
                                <Button onClick={toggle} className="modalCloseBtn">X</Button>
                            </ModalHeader>
                            <ModalBody>
                                <NoteAdd fetchNotes={fetchNotes} token={props.token} />
                            </ModalBody>
                        </Modal>

                    </Row>
                </div>
                <NoteTable notes={notes} editUpdateNote={editUpdateNote} getPhoto={getPhoto} updateOn={updateOn} updatePhotoOn={updatePhotoOn} fetchNotes={fetchNotes} token={props.token} />
                {/* {updateActive ? <NoteEdit noteToUpdate={noteToUpdate} updateOff={updateOff} token={props.token} fetchNotes={fetchNotes}/>: <> </>} */}

                {updateActive ?
                    <NoteEdit noteToUpdate={noteToUpdate} updateOff={updateOff} token={props.token} fetchNotes={fetchNotes} /> : <> </>}

                {updateActivePhoto ?
                    <NotePhoto editPhoto={editPhoto} updatePhotoOff={updatePhotoOff} token={props.token} fetchNotes={fetchNotes} /> : <> </>}

            </div>
        </div>
    )
}

export default NoteIndex;