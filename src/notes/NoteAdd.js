import '../App.css';
import React, { useState } from 'react';
import logo from "../assets/team-gardener-logo.png";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const NoteAdd = (props) => {
    const [plantName, setPlantName] = useState('');
    const [note, setNote] = useState('');
    const [plantPhoto, setPlantPhoto] = useState('');
    const cred = process.env.REACT_APP_UNSPLASH_ACCESS;


    const handleSubmit = (e) => {
        e.preventDefault();
        Promise.all([
            fetch(`https://api.unsplash.com/search/photos?query=${plantName}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Client-ID x4UWundczSLGnfibSKyuMpbgjpIAwY4kAF0kII5ZHpo`
                })
            }),
            fetch('http://localhost:3000/notes/add/', {
                method: 'POST',
                body: JSON.stringify({ notes: { plant_name: plantName, note: note } }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                })
            })
        ]).then(function (responses) {
            //Get json from the responses and list it all out
            return Promise.all(responses.map(function(response) {
                return response.json();
            }));
        }).then(function(data) {
            console.log(data[0]);
            const photoResults = data[0].results[0].urls.thumb;
            setPlantPhoto(photoResults)
            setPlantName('');
            setNote('');
            props.fetchNotes();
            console.log(plantPhoto);
            console.log(plantName);
            console.log(note);
        })

    }

    return (
        // <div className="bgDiv">
        //     <img src={logo} alt="Team Gardeners Logo" className="logoImg" />
        //     <div className="mainDiv">
        //         add a new note!
        //         <br />
        //         <Button className="mainBtn">view notes</Button>
        //         <br />
        //         <Form>
        //             <FormGroup>
        //                 <Input name="plant_name" type="textarea" id="exampleText" placeholder="Plant name here" className="formInputName" value={plantName} onChange={(e) => setPlantName(e.target.value)} />
        //             </FormGroup>
        //             <FormGroup>
        //                 <Label htmlFor="note" />Plant Note
        //                 <Input name="note" type="textarea" id="exampleText" placeholder="Plant note here" className="formInputName" value={note} onChange={(e) => setNote(e.target.value)} />
        //             </FormGroup>
        //             <Button className="submitBtn" type="submit">click to save</Button>
        //             <Button className="cancelBtn">cancel</Button>
        //         </Form>
        //     </div>
        // </div>

        <>

            <div className="mainDiv">
                add a new plant note!
                <Form className="form" onSubmit={handleSubmit}>
                    <FormGroup>
                        {/* <Label htmlFor="plant_name" />Plant Name
                    <Input name="plant_name" value={plantName} onChange={(e) => setPlantName(e.target.value)} /> */}
                        <Input name="plant_name" type="textarea" id="exampleText" placeholder="Plant name here" className="formInputName" value={plantName} onChange={(e) => setPlantName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        {/* <Label htmlFor="note" />Plant Note
                    <Input name="note" type="textarea" value={note} onChange={(e) => setNote(e.target.value)} /> */}
                        <Input name="note" type="textarea" id="exampleText" placeholder="Plant note here" className="formInputName" value={note} onChange={(e) => setNote(e.target.value)} />
                    </FormGroup>
                    <Button className="submitBtn" type="submit">Click to Save</Button>
                </Form>
            </div>
        </>
    )
}

export default NoteAdd;