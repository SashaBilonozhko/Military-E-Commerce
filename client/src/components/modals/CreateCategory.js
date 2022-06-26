import React from 'react'
import { Container, Modal, Form, Button } from 'react-bootstrap';

const CreateCategory = ({show, onHide}) => {
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
                Додати категорію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите название категории"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
                <Button variant={'outline-success'} onClick={onHide}>Добавить</Button>
                <div 
                className="d-flex justify-content-evenly delete font adminbutton col-4" 
                onClick={onHide}
                style={{cursor:"pointer"}}
                >
                    <span>Скасувати</span>
                </div>
                <div 
                className="d-flex justify-content-evenly edit font adminbutton col-4"
                onClick={addType}
                style={{cursor:"pointer"}}
                >
                    <span className='d-inline'>Додати</span>
                </div>
            </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default CreateCategory