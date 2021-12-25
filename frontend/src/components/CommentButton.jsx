import { Button, Container, FloatingLabel, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"
import axios from 'axios';

const CommentButton = ({title, setReload}) => {

    const [formOpen, setFormOpen] = useState(false)
    const [text, setText] = useState("")

    const postComment = async () => {
        const token = localStorage.getItem('token')
        try {
            
            const res = await axios.post(`/api/travels/comments/${title}`, {text: text}, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            console.log(res)
        } catch(err) {
            console.log(err)

        }
        setText("")
        setFormOpen(false)
        setReload(prev => !prev)
    }

    return formOpen 
    ?
    <div style={{width: '40%'}} className="d-block mx-auto">
        <FloatingLabel controlId="floatingTextarea" label="Comments">
            <Form.Control
            onChange={(e) => setText(e.target.value)}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
            />
        </FloatingLabel>
        <div className="d-flex justify-content-between">
            <Button onClick={postComment}>Post</Button>
            <AiOutlineClose onClick={() => setFormOpen(false)}></AiOutlineClose>
        </div>
    </div>
    :
    <Button className='d-block mx-auto mt-4' style={{marginBottom: '100px'}} onClick={() => setFormOpen(true)}>Post a comment</Button>
}

export default CommentButton;