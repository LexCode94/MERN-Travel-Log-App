

const Comment = ({text, author}) => {



    return (
        <div className='d-block mx-auto border-bottom mb-3' style={{width: '40%'}}>
            <p>{text}</p>
            <p className="d-flex justify-content-end">By: <span style={{fontWeight: 'bold'}}>{author}</span></p>
        </div>
    )
}

export default Comment;