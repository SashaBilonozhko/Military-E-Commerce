import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneProduct, addToCart, deleteComment, deleteReply, addRate } from '../http/productAPI';
import {TbArrowForwardUp} from "react-icons/tb"
import CreateReply from "../components/modals/CreateReply"
import CreateRate from '../components/modals/CreateRate';
import CreateComment from "../components/modals/CreateComment"
import {BsArrow90DegUp} from "react-icons/bs"
import {AiOutlineDelete} from 'react-icons/ai'
import {BiCommentAdd} from 'react-icons/bi'
import {FaShoppingCart} from 'react-icons/fa'
import {FiThumbsUp} from 'react-icons/fi'

const ProductPage = () => {
    const [product, setProduct] = useState({info: [], comments: [], replies: []})
    const [replyVisible, setReplyVisible] = useState(false)
    const [rateVisible, setRateVisible] = useState(false)
    const [commentVisible, setCommentVisible] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [id])

    const createRate = (prodId) => {
        setRateVisible(true)
        addRate(prodId)
    }

    return (
        <Container className="mt-3 justify-content-center">
            <Row sm={9} md={9} xl={9} className="mb-5">
                <Col className="m-auto">
                    <Image width={500} height={500} src={process.env.REACT_APP_API_URL + product.img}/>
                </Col>
                <Col>
                    <Row className="mt-2 mb-2 font-big">
                        <h2>{product.name}</h2>
                    </Row>
                    {product.info.map((info, index) =>
                        <Row 
                        key={product.info.id} 
                        className='font'
                        style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                        >
                            {info.name}: {info.desc}
                        </Row>
                    )}
                    <Row className="d-flex mt-2 justify-content-between font-big">
                        <h2>{product.price} ₴</h2>
                    </Row>
                    {/* <Button className="mt-2" variant={"outline-success"} onClick={() => addToCart(product.id).then(document.location.reload())}>В корзину</Button> */}
                    <Row className="d-flex justify-content-evenly col-md-5 col-sm-7">
                        <div 
                        className="d-flex justify-content-evenly edit font adminbutton col-4"
                        onClick={() => addToCart(product.id).then(document.location.reload())}
                        style={{cursor:'pointer'}}
                        >
                            <FaShoppingCart className='adminbutton-icon d-inline'/>
                            <span className='d-inline'>У корзину</span>
                        </div>
                        <div 
                        className="d-flex justify-content-evenly edit font adminbutton col-4"
                        onClick={() => setRateVisible(true).then(document.location.reload())}
                        style={{cursor:'pointer'}}
                        >
                            <FiThumbsUp className='adminbutton-icon d-inline'/>
                            <span className='d-inline'>Оцінити</span>
                        </div>
                    </Row>
                </Col>
            </Row>
            <hr style={{color: 'grey', size: '1px'}}/>
            <Row className='offset-1'>
                <Col className="d-block">
                    <Row className="d-inline mt-2 mb-2"> 
                        <span className='d-inline font-big'>Коментарі</span>
                        <span className='d-inline font link'
                                        style={{cursor:'pointer'}}
                                        onClick={() => setCommentVisible(true).then(document.location.reload())}
                                        >
                                        <BiCommentAdd
                                        style={{height: '20px',
                                                width: '20px'}}
                                                className="m-2"
                                        />
                                        Прокоментувати...
                                    </span>
                    </Row>
                    {product.comments.map((comment, index) =>
                    <Col sm={9} md={9} xl={9}>
                        <Row className="mt-2 mb-2 comment"
                        key={comment.id}
                        >
                            <Col>
                                <Row className='d-inline'>
                                    <span className='d-inline font'>{comment.nickname}</span>
                                    <span className='d-inline font'>{comment.createdAt}</span>
                                    <span className='d-inline font link'
                                        style={{cursor:'pointer'}}
                                        onClick={() => setReplyVisible(true).then(document.location.reload())}
                                        >
                                        <TbArrowForwardUp
                                        style={{height: '20px',
                                                width: '20px'}}
                                        />
                                        Відповісти
                                    </span>
                                    <span className='d-inline font link'
                                        style={{cursor:'pointer'}}
                                        onClick={() => deleteComment(comment.id).then(document.location.reload())}>
                                        <AiOutlineDelete
                                        style={{height: '20px',
                                                width: '20px'}}/>
                                    </span>
                                </Row>
                                <span className='d-block font-big'>{comment.text}</span>
                            </Col>
                        </Row>
                        {product.replies.map((reply, index) =>
                        {
                            if(reply.productCommentId === comment.id)
                            return <Row className="mt-2 mb-2 reply"
                            key={reply.id}
                            >
                                <BsArrow90DegUp className='reply-icon'/>
                                <Col>
                                    <Row className='d-inline'>
                                        <span className='d-inline font'>{reply.nickname}</span>
                                        <span className='d-inline font'>{reply.createdAt}</span>
                                        <span className='d-inline font link'
                                        style={{cursor:'pointer'}}
                                        onClick={() => deleteReply(reply.id).then(document.location.reload())}>
                                            <AiOutlineDelete
                                            style={{height: '20px',
                                                    width: '20px'}}/>
                                        </span>
                                    </Row>
                                    <span className='d-block font-big'>{reply.text}</span>
                                </Col>
                            </Row>
                            return <div/>
                        }
                        )}
                        <CreateRate prodId={product.id} show={rateVisible} onHide={() => setRateVisible(false)}/>
                        <CreateComment prodId={product.id} show={commentVisible} onHide={() => setCommentVisible(false)}/>
                        <CreateReply commId={comment.id} prodId={product.id} show={replyVisible} onHide={() => setReplyVisible(false)}/>
                    </Col>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default ProductPage