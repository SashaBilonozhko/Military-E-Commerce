import React, {useContext} from 'react'
import {Context} from "../../index";
import { Container, Modal, Form, Button, Dropdown, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { createProduct, fetchTypes } from '../../http/productAPI';
import { fetchProducts } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';

const CreateProduct = observer(({show, onHide}) => {
    const {product} = useContext(Context)
    const [info, setInfo] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)

    useEffect(() => {
        fetchTypes().then(data => product.setProductTypes(data))
        fetchProducts().then(data => product.setProducts(data.rows))
    }, [product])

    const addInfo = () => {
        setInfo([...info, {name: '', desc: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProduct = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('productTypeId', product.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createProduct(formData).then(data => onHide())
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
                Додати продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Form>
                    <Dropdown>
                    <Dropdown.Toggle>{product.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                            {product.productTypes.map(productType =>
                                <Dropdown.Item
                                    onClick={() => product.setSelectedType(productType)}
                                    key={productType.id}
                                >
                                    {productType.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть назву..."
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введіть вартість..."
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Додати опис
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.name}
                                    onChange={(e) => changeInfo('name', e.target.value, i.number)}
                                    placeholder="Введіть назву..."
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.desc}
                                    onChange={(e) => changeInfo('desc', e.target.value, i.number)}
                                    placeholder="Введіть опис..."
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Видалити
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Скасувати</Button>
                <Button variant={'outline-success'} onClick={addProduct}>Додати</Button>
            </Modal.Footer>
            </Modal>
        </Container>
    );
})

export default CreateProduct