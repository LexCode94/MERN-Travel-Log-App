import { Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CommentButton from "./CommentButton";
import axios from 'axios';
import Comment from "./Comment";




const Travel = () => {

    const [travelData, setTravelData] = useState({})
    const [comments, setComments] = useState([])
    const [reload, setReload] = useState(false)
    const { title } = useParams();
    const travels = useSelector(state => state.travels)

    useEffect(() => {
        const data = travels.find(e => e.title === title)
        setTravelData(data)
        console.log(data)
    }, [title, travels])
   
    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await axios.get(`/api/travels/comments/${title}`, { 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setComments(res.data)
                console.log("comments response: ", res)
            } catch (err) {
                console.log(err)
            }
        }
        getComments();
        console.log("Comments se promenio")
    }, [title, reload])
    

    return (
        <Container>
            <h2 className="d-flex justify-content-center mt-4">{travelData?.title}</h2>
            <h4 className="d-flex justify-content-center mt-4">{travelData?.location}</h4>
            <Image src={travelData && `http://localhost:5000/${travelData.image}`} className="d-block mx-auto"/>
            <p className="d-flex justify-content-center mt-4">{travelData?.description}</p>
            {comments && comments.map(e => {
                return <Comment text={e.text} author={e.author} key={e.text} />
            })}
            <CommentButton title={title} setReload={setReload}/>
            
        </Container>
    )
}

export default Travel;