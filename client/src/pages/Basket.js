import React, {useContext, useEffect} from 'react'
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BasketProductList from '../components/BasketProductList'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchTypes, fetchBasketProducts } from '../http/productAPI';
import Pages from '../components/Pages';

const Basket =  observer(() => {
    const {product} = useContext(Context)
    useEffect(() => {
        fetchTypes().then(data => product.setProductTypes(data))
        fetchBasketProducts(null, 1, 3).then(data => {
            product.setBasketProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product])

    useEffect(() => {
        fetchBasketProducts(product.selectedType.id, product.page, product.limit).then(data => {
            product.setBasketProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product, product.basketProducts.selectedType, product.page])

    return (
        <Container>
            <h2 className={"mt-2"}>Корзина</h2>
            <Row className="mt-2">
                <Col sm={12} md={12} xl={12} className="offset-1">
                    <BasketProductList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
})

export default Basket