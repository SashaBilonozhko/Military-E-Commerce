import { Col, Row, Button } from "react-bootstrap";
import AdminProductItem from './AdminProductItem'
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import {Context} from "..";
import UpdateProduct from "./modals/UpdateProduct";
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'
import { deleteProduct } from "../http/productAPI";

const AdminProductList = observer(() => {
    const {product} = useContext(Context)
    const [productVisible, setProductVisible] = useState(false)
    return (
        <Row className='d-flex'>
            {product.products.map(product =>
            <Col sm={4} md={4} xl={4}>
                <UpdateProduct prodId={product.id} show={productVisible} onHide={() => setProductVisible(false)}/>
                <AdminProductItem className="d-flex" key={product.id} product={product}/>
                <Row
                className="d-flex justify-content-evenly mt-3"
                >
                {/* <Button className="d-inline-block align-items-start edit adminbutton" onClick={() => setProductVisible(true).then(document.location.reload())} size={'sm'}>
                    <AiOutlineEdit className='adminbutton-icon'/>
                </Button> */}
                <Button 
                className="d-flex rounded-pill justify-content-evenly edit font adminbutton col-4"
                onClick={() => setProductVisible(true).then(document.location.reload())}
                >
                    <AiOutlineEdit className='adminbutton-icon d-inline'/>
                    <span className='d-inline'>змінити</span>
                </Button>
                {/* <Button className="d-inline-block align-items-start delete adminbutton" onClick={() => deleteProduct(product.id).then(document.location.reload())} size={'sm'}>
                    <AiOutlineDelete className='adminbutton-icon'/>
                </Button> */}
                <Button
                className="d-flex rounded-pill justify-content-evenly delete font adminbutton col-4" 
                onClick={() => deleteProduct(product.id).then(document.location.reload())}
                >
                    <AiOutlineDelete className='adminbutton-icon'/>
                    <span>видалити</span>
                </Button>
                </Row>
             </Col>
            )}
            <Col sm={4} md={4} xl={4} className="admin-add">
            </Col>
        </Row>
    );
});

export default AdminProductList