import { Row, Form, FormControl } from "react-bootstrap";
import ProductItem from './ProductItem'
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import {Context} from "..";
import {HiSearch} from 'react-icons/hi'

const ProductList = observer(() => {
    const {product} = useContext(Context)
    return (
        <Row>
            <Row className='d-flex col-10 justify-content-end'>
                <Form className="d-flex align-items-center col-3">
                    <FormControl
                    type="search"
                    placeholder="Знайти..."
                    className="me-2 font"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    />
                    <span className="input-group-text border-0 bg-transparent" id="search-addon">
                        <HiSearch className='icon link'/>
                    </span>
                </Form>
            </Row>
            <Row className='d-flex col-10'>
                {product.products.map(product =>
                    <ProductItem key={product.id} product={product}/>)}
            </Row>
        </Row>
    );
});

export default ProductList