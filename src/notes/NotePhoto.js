import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

const NotePhoto = (props) => {

    const [plantPhoto, setPlantPhoto] = useState('');
    const [plantPhotoId, setPlantPhotoId] = useState(props.editPhoto.id);
    const [plantPhotoName, setPlantPhotoName] = useState(props.editPhoto.plant_name);
    

    const addPhoto = (event, note) => {
        // event.preventDefault();
        fetch(`http://localhost:3000/photo/update/${plantPhotoId}`, {
            method: 'PUT',
            body: JSON.stringify({notes: {photo: plantPhoto}}),
            // body: JSON.stringify({notes: {plant_name: plantPhotoName}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then((res) => {
            setPlantPhoto();
            props.fetchNotes();
            props.updatePhotoOff();
            console.log(plantPhotoId);
            
        })
    }


    return(
        //doing a modal would give ability to open and close
        // <Modal isOpen={true}>
        //     <ModalHeader></ModalHeader>
        // </Modal>
        <div>
            <Form onSubmit={addPhoto()}>
                <FormGroup>
                    <Label htmlFor="photo">Would you like to add a photo?</Label>
                    <Input name="photo" value={plantPhoto} onChange={(e) => setPlantPhoto(e.target.value)}/>
                </FormGroup>
                <Button type="submit">Add your photo</Button>
            </Form>
            {/* <Button className= "button" onClick={() => {addPhoto() }}>Add Photo</Button> */}
        </div>
    )
}

export default NotePhoto;