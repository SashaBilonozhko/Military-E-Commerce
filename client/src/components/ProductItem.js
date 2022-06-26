import React from "react";
import { Col, Image, Card} from "react-bootstrap";
// eslint-disable-next-line
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";
import './styles.css'

const ProductItem = ({product}) => {
    const history = useHistory()
    return (
        <Col sm={4} md={4} xl={4} className="mt-3 font-big">
            <Card style={{cursor:'pointer'}} border={'light'} onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
                <Image src={process.env.REACT_APP_API_URL + product.img} className="img-fluid"/>
                <div className="mt-1 d-flex justify-content-between align-items-center">
                    <div className="text-truncate">{product.name}</div>
                    
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                        <div>
                            {product.price} ₴
                        </div>
                        <div>
                            {product.rating}/5
                            <FaRegStar/>
                        </div>
                    </div>
                <div>
                    
                </div>
            </Card>
        </Col>
    );
};

export default ProductItem