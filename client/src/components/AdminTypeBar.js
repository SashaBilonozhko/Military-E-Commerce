import React, { useContext, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Context } from '..'
import './styles.css'
import UpdateType from './modals/UpdateType'
import CreateType from './modals/CreateType'
import CreateProduct from './modals/CreateProduct'
import { Col, Dropdown, Row, Button } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import {AiOutlineDelete, AiOutlineFileAdd, AiOutlineEdit} from 'react-icons/ai'
import {IoMdAddCircleOutline} from 'react-icons/io'
import { deleteType, updateType } from "../http/productAPI";

const TypeBar = observer(() => {
    const {product} = useContext(Context)
    const [typeCreateVisible, setCreateTypeVisible] = useState(false)
    const [typeEditVisible, setEditTypeVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)

    const changeType = (prodTypeId) => {
        setEditTypeVisible(true)
        updateType(prodTypeId)
    }

    const createType = () => {
        setCreateTypeVisible(true)
        createType()
    }

    return (
        <ListGroup>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <Button 
                className="d-flex rounded-pill delete font-big adminbutton p-2 mb-2 mt-2" 
                style={{cursor:'pointer',
                        width:'fit-content'}} 
                onClick={() => setProductVisible(true)}
                >
                    <AiOutlineFileAdd className='adminbutton-icon'/>
                    <span>Додати продукт</span>
                </Button>
            {product.categories.map(category =>
                <Dropdown
                style={{cursor:'pointer'}} 
                variant="light"
                active={category.id === product.selectedCategory.id}
                // onClick={() => product.setSelectedCategory(category)}
                className="d-flex border-bottom item pt-2 pb-2 ml-2"
                key={category.id}
                >
                    <Row className='d-inline-block'>
                    <CreateType categoryId={category.id} show={typeCreateVisible} onHide={() => setCreateTypeVisible(false)}/>
                    <Dropdown.Toggle 
                    className='d-inline font-big text-center justify-content-between'
                    style={{width: 'fit-content'}}
                    as="span">
                    {category.name}
                    </Dropdown.Toggle>
                    <div className='d-inline font link' >
                    <IoMdAddCircleOutline
                    onClick={() => createType().then(document.location.reload())}
                    style={{height: '2vw',
                    width: '2vw'}}
                    />
                    </div>
                    </Row>
                    <Dropdown.Menu 
                    className='rounded-0 p-0'
                    style={{border:"none"}}>
                        <Col>
                        {product.productTypes.map(productType =>
                            {
                                if(productType.categoryId === category.id)
                                return <Dropdown.Item
                                        className="font border-bottom border-secondary item p-0 pt-2 pb-2"
                                        style={{cursor:'pointer'}} 
                                        action variant="light"
                                        key={productType.id}
                                        active={productType.id === product.selectedType.id}
                                        onClick={() => product.setSelectedType(productType)}
                                        >
                                        <UpdateType typeId={productType.id} show={typeEditVisible} onHide={() => setEditTypeVisible(false)}/>
                                        <Row className='justify-content-between m-0'>
                                            <span className='d-inline' style={{width: 'fit-content'}}>{productType.name}</span>
                                            <Row className='d-inline col-5 m-0'>
                                                <div className='d-inline font link'>
                                                    <AiOutlineEdit  
                                                    onClick={() => changeType(productType.id).then(document.location.reload())}
                                                    style={{height: '1.5vw',
                                                    width: '1.5vw'}}/>
                                                </div>
                                                <div className='d-inline font link' >
                                                    <AiOutlineDelete 
                                                    onClick={() => deleteType(productType.id).then(document.location.reload())}
                                                    style={{height: '1.5vw',
                                                    width: '1.5vw'}}/>
                                                </div>
                                            </Row>
                                        </Row>
                                    </Dropdown.Item>
                                return null
                            }
                            )}
                            </Col>
                        </Dropdown.Menu>
                    </Dropdown>                
            )}
        </ListGroup>
    );
});

export default TypeBar