import React, {useContext, useEffect} from 'react'
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductList from '../components/ProductList'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchTypes, fetchProducts } from '../http/productAPI';
import Pages from '../components/Pages';

const Shop = observer(() => {
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
    
    return (
        <Container>
            <Row className="mt-2">
                <Col sm={12} md={12} xl={12} className="offset-1">
                    <ProductList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
})

export default Shop