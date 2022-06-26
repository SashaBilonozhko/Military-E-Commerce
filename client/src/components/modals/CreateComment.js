import React, { useState } from 'react'
import { Container, Form, Modal} from 'react-bootstrap';
import { comment } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';

const CreateComment = observer(({prodId, show, onHide}) => {

const [value, setValue] = useState('')
const addComment = () => {
        const formData = new FormData()
        formData.append('text', value)
        comment(prodId, formData).then(data => onHide())
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
                <Modal.Title id="contained-modal-title-vcenter">
                    Додати коментар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                    as={'textarea'}
                    rows={4}
                    value = {value}
                    onChange={e => setValue(e.target.value)}
                        placeholder={"Додайте свій коментар..."}
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
                onClick={addComment}
                style={{cursor:"pointer"}}
                >
                    <span className='d-inline'>Додати</span>
                </div>
            </Modal.Footer>
            </Modal>
        </Container>
    );
})

export default CreateComment