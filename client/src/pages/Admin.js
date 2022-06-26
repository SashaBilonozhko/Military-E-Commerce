/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
import CreateProduct from '../components/modals/CreateProduct';
import CreateType from '../components/modals/CreateType';
import UpdateType from '../components/modals/UpdateType';
import AdminTypeBar from '../components/AdminTypeBar'
import Pages from '../components/Pages';
import AdminProductList from '../components/AdminProductList'
import { fetchTypes, fetchProducts } from '../http/productAPI';
import { check, checkForAdmin } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Admin = observer(() => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)

    const {product} = useContext(Context)
    useEffect(() => {
        fetchTypes().then(data => product.setProductTypes(data))
        fetchProducts(null, 1, 3).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product])

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.page, product.limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product, product.selectedType, product.page])

    check().then(result =>
        {result ?
            console.log('User is Admin')
            : 
            console.log('User is not Admin')         
        }
    )

    return (
        <Container className="d-flex flex-column">
            {/* <Button variant={'outline-warning'} className="mt-3" onClick={() => setTypeVisible(true)}>
                Додати тип
            </Button> */}
            {/* <Button variant={'outline-warning'} className="mt-3" onClick={() => setProductVisible(true)}>
                Додати продукт
            </Button> */}
            {/* <UpdateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/> */}
            {/* <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/> */}
            <Row className="mt-2">
                <Col sm={3} md={3} xl={3}>
                    <AdminTypeBar />
                </Col>
                <Col sm={9} md={9} xl={9}>
                    <AdminProductList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
})

export default Admin