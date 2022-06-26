import React, { useState } from 'react'
import { Container, Form, Modal, Button } from 'react-bootstrap';
import { updateType } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';

const UpdateType = observer(({typeId, show, onHide}) => {

const [value, setValue] = useState('')
const changeType = () => {
    const formData = new FormData()
    formData.append('id', typeId)
    formData.append('name', value)
    updateType(formData).then(data => onHide())
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
                Змінити тип продукту
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                    value = {value}
                    onChange={e => setValue(e.target.value)}
                        placeholder={"Введіть назву типу..."}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Скасувати</Button>
                <Button variant={'outline-success'} onClick={changeType}>Зберегти</Button>
            </Modal.Footer>
            </Modal>
        </Container>
    );
})

export default UpdateType