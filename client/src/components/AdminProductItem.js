import React from "react";
import { Col, Image, Card } from "react-bootstrap";
import { FaRegStar } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";
import './styles.css'
// import UpdateProduct from "./modals/UpdateProduct";
// import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'
// import { deleteProduct } from "../http/productAPI";

const AdminProductItem = ({product}) => {
    // const [productVisible, setProductVisible] = useState(false)
    const history = useHistory()
    return (
        <Col className="mt-3 item font-big">
            <Card style={{cursor:'pointer'}} border={'light'} onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
                <Image src={process.env.REACT_APP_API_URL + product.img} className="img-fluid"/>
                <div className="mt-1 d-flex justify-content-between align-items-center">
                    <div className="text-truncate">{product.name}</div>
                    <div className="d-flex align-items-center">
                        <div>
                            {product.rating}/5
                        </div>
                        <FaRegStar/>
                    </div>
                </div>
            </Card> 
        </Col>
    );
};

export default AdminProductItem