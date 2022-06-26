import React, { useContext } from 'react'
import {observer} from 'mobx-react-lite'
import { Context } from '..'
import './styles.css'
import ListGroup from 'react-bootstrap/ListGroup'

const TypeBar = observer(() => {
    const {product} = useContext(Context)
    return (
        <ListGroup variant='flush'>
            <ListGroup.Item
            style={{cursor:'pointer'}} 
            action variant="light"
            active={product.selectedType.id === null}
            onClick={() => product.resetSelectedType()}
            >
                Всі продукти
            </ListGroup.Item>
            {product.productTypes.map(productType =>
                <ListGroup.Item
                style={{cursor:'pointer'}} 
                action variant="light"
                active={productType.id === product.selectedType.id}
                onClick={() => product.setSelectedType(productType)}
                key={productType.id}
                >
                    {productType.name}
                </ListGroup.Item>       
            )}
        </ListGroup>
    );
});

export default TypeBar