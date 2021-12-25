import { Form, FloatingLabel, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const Upload = () => {

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState(null);
    
    const dispatch = useDispatch();

    const submitForm = (e) => {
        e.preventDefault();
        setError(null)
        const formData = new FormData();
        formData.append('title', title)
        formData.append('location', location)
        formData.append('travel-image', image)
        formData.append('description', description)

        const send = async () => {
            const token = localStorage.getItem('token')
            try {
                if(token) {
                    const res = await axios.post(`api/travels/${title}`, formData, { 
                        headers: 
                        {'Authorization': 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data'} 
                    })
                } else {
                    throw new Error("You must log in to post.")
                }
                
            } catch(err) {
                setError(err.message)
                console.log(err)
            }
            
        }

        send()

        console.log(formData)
    }

    return(
        <Container>
            <Row>
                <Col>
                    {error && <Alert className='mt-4' variant='danger' onClose={() => setError(null)}>
                            <Alert.Heading>You got an error!</Alert.Heading>
                            <p>{error}</p>
                        </Alert>}
                    <h2 className='mb-4'>Upload your travel</h2>
                    <Form className='mb-4'>
                        <Form.Group className='mb-4'>
                            <Form.Label>Upload title</Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className='mb-4'>
                            <Form.Label>Upload location</Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Enter location" onChange={(e) => setLocation(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload picture</Form.Label>
                            <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Upload description</Form.Label>
                            <FloatingLabel controlId="floatingTextarea2" label="Description">
                                <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                onChange={(e) => setDescription(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                    <Button onClick={submitForm}>Submit</Button>
                </Col>
            </Row>
        </Container>

    )
}

export default Upload;