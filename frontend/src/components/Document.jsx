import { Container, FloatingLabel, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/loginActions";


const Document = ({register}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const dispatch = useDispatch()

    const url = register ? '/api/user/register' : '/api/user/login'

    const submitForm = async () => {
        const body = {
            username: username,
            password: password
        }
        try {
            setError(null)
            const res = await axios.post(url, body, {headers: {'Content-Type':'application/json'}})
            console.log("Axios response:" ,res)
            !register && localStorage.setItem("token", res.data.token)
            dispatch(login())
        } catch (err){
            console.log(err)
            setError(err.message)
        }
        
        
    }

    return (
        <Container className="mt-4">
            {error && 
            <Alert variant="danger" onClose={() => setError(null)}>
                    <Alert.Heading>You got an error!</Alert.Heading>
                    <p>{error}</p>
                </Alert>}
            <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
            >
                <Form.Control type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </FloatingLabel>
            <Button className="mt-4 d-block mx-auto" onClick={submitForm}>Submit</Button>
        </Container>
    )
}

export default Document;