import React, { useState } from 'react'
import { Container, Form, Modal } from 'react-bootstrap';
import { addRate } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';
import { FaRegStar } from 'react-icons/fa';

const CreateRate = observer(({prodId, show, onHide}) => {

const [value, setValue] = useState(0)
const createRate = () => {
        addRate(prodId, {'rate': `${value}`}).then(data => {
            setValue(0)
            onHide()
        })
    }

    return (
        <Container className="d-flex flex-column">
            <Modal
            show = {show} 
            onHide = {onHide}
            size="md"
            centered
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оцінити товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='d-flex justify-content-evenly'>
                    <FaRegStar 
                    value={1}
                    className='icon link'
                    style={{height:"40px",
                            width:"40px"}}
                    onClick={e => setValue(e.target.value)}/>
                    <FaRegStar 
                    value={2}
                    className='icon link'
                    style={{height:"40px",
                            width:"40px"}}
                    onClick={e => setValue(e.target.value)}/>
                    <FaRegStar
                    value={3} 
                    className='icon link'
                    style={{height:"40px",
                            width:"40px"}}
                    onClick={e => setValue(e.target.value)}/>
                    <FaRegStar
                    value={4} 
                    className='icon link'
                    style={{height:"40px",
                            width:"40px"}}
                    onClick={e => setValue(e.target.value)}/>
                    <FaRegStar
                    value={5} 
                    className='icon link'
                    style={{height:"40px",
                            width:"40px"}}
                    onClick={e => setValue(e.target.value)}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div 
                className="d-flex justify-content-evenly delete font adminbutton col-4" 
                onClick={onHide}
                style={{cursor:"pointer"}}
                >
                    <span>Скасувати</span>
                </div>
                <div 
                className="d-flex justify-content-evenly edit font adminbutton col-4"
                onClick={createRate}
                style={{cursor:"pointer"}}
                >
                    <span className='d-inline'>Додати</span>
                </div>
            </Modal.Footer>
            </Modal>
        </Container>
    );
})

export default CreateRate