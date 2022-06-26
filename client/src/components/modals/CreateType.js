import React, { useState, useContext } from 'react'
import {Context} from "../../index";
import { Container, Form, Modal, Dropdown } from 'react-bootstrap';
import { createType } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';

const CreateType = observer(({show, onHide}) => {

const [value, setValue] = useState('')
const {product} = useContext(Context)
const addType = () => {
    const formData = new FormData()
    formData.append('name', value)
    formData.append('categoryId', product.selectedCategory.id)
    createType(formData).then(data => onHide())
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
                Додати тип продукту
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle 
                    as="span" 
                    className='d-inline font link rounded-0 p-1 m-1 mb-2'
                    style={{width: 'fit-content'}}
                    >
                        {product.selectedCategory.name || "Оберіть категорію..."}
                    </Dropdown.Toggle>
                    <Dropdown.Menu 
                    className='rounded-0 p-0 font'
                    style={{border:"2px solid"}}>
                            {product.categories.map(category =>
                                <Dropdown.Item
                                    onClick={() => product.setSelectedCategory(category)}
                                    key={category.id}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                <Form>
                    <Form.Control
                    value = {value}
                    onChange={e => setValue(e.target.value)}
                        placeholder={"Введіть назву типу..."}
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
                onClick={addType}
                style={{cursor:"pointer"}}
                >
                    <span className='d-inline'>Додати</span>
                </div>
            </Modal.Footer>
            </Modal>
        </Container>
    );
})

export default CreateType