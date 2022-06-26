import React from "react";
import { Col, Image, Card, Row, Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { PRODUCT_ROUTE } from "../utils/consts";
import './styles.css'

const BasketProductItem = ({basketProduct}) => {
    const history = useHistory()
    return (
        <Col sm={4} md={4} xl={4} className="mt-3">
            <Card style={{cursor:'pointer'}} border={'light'} onClick={() => history.push(PRODUCT_ROUTE + '/' + basketProduct.product.id)}>
                <Image src={process.env.REACT_APP_API_URL + basketProduct.product.img} className="img-fluid"/>
                <div className="mt-1 d-flex justify-content-between align-items-center">
                    <div className="text-truncate">{basketProduct.product.name}</div>
                    <div className="d-flex align-items-center">
                        <div>
                            {basketProduct.product.rating}/5
                        </div>
                        <FaRegStar/>
                    </div>
                </div>
            </Card>
            <Row className="d-inline">
                <Button
                className="d-flex rounded-pill justify-content-evenly delete font adminbutton col-4" 
                // onClick={() => deleteProduct(product.id).then(document.location.reload())}
                >
                    {/* <AiOutlineDelete className='adminbutton-icon'/> */}
                    <span>Видалити</span>
                </Button>
            </Row>
        </Col>
    );
};

export default BasketProductItem