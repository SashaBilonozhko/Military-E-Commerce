import { Row } from "react-bootstrap";
import BasketProductItem from './BasketProductItem'
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import {Context} from "..";

const BasketProductList = observer(() => {
    const {product} = useContext(Context)
    return (
        <Row className='d-flex col-10'>
            {product.basketProducts.map(basketProduct =>
                <BasketProductItem key={basketProduct.id} basketProduct={basketProduct}/>)}
        </Row>
    );
});

export default BasketProductList