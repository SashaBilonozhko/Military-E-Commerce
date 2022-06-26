import { Row, Card, Col, Form, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import {comment, getComments, getReplies} from "../http/productAPI"
import { useContext, useEffect, useState } from "react";
import {Context} from "..";



const CommentSection = (prodId) => {
    const {product} = useContext(Context)
    const [value, setValue] = useState('')
    const addComment = () => {
        comment({text: value}).then(data => {
            setValue('')
        })
    }
    useEffect(() => {
       getComments(prodId).then(data => product.setComments(data))
       getReplies(prodId).then(data => product.setReplies(data))
    })

    return (
        <Col className='d-flex'>
                <Form className='d-inline'>
                    <Form.Control
                    className='d-inline'
                    value = {value}
                    onChange={e => setValue(e.target.value)}
                        placeholder={"Додайте коментар..."}
                    />
                    <Button className='d-inline' onClick={() => addComment(prodId).then(document.location.reload())}></Button>
                </Form>
                {product.comments.map(comment =>
                    <Card 
                    key={comment.id}
                    className="d-flex comment"
                    >
                        <Card.Header>
                            <h3>{comment.username}</h3>
                            <h4>{comment.createdAt}</h4>
                        </Card.Header>
                        <Card.Text
                        className="font"
                        >
                            {comment.text}
                        </Card.Text>
                    </Card>
                      
                )}
                    {/* <Col sm={4} md={4} xl={4} className="mt-3">
                        <Card style={{cursor:'pointer'}} border={'light'} onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
                            
                        </Card>
                    </Col> */}
        </Col>
    );
};

export default CommentSection