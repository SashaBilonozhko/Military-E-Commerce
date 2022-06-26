import React, { useState } from 'react'
import { Container, Form, Modal} from 'react-bootstrap';
import { reply } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';

const CreateReply = observer(({commId, prodId, show, onHide}) => {

const [value, setValue] = useState('')
const addReply = () => {
        const formData = new FormData()
        formData.append('text', value)
        reply(prodId, commId, formData).then(data => onHide())
    }

    return (
        <Container className="d-flex flex-column">
            <Modal
            show = {show}
            onHide = {onHide}
            size="lg"
            centered
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" className="font-big">
                    Додати відповідь
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                    as={'textarea'}
                    rows={4}
                    value = {value}
                    onChange={e => setValue(e.target.value)}
                        placeholder={"Додайте відповідь..."}
                    />
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
                onClick={addReply}
                style={{cursor:"pointer"}}
                >
                    <span className='d-inline'>Додати</span>
                </div>
            </Modal.Footer>
            </Modal>
        </Container>
    );
})

export default CreateReply