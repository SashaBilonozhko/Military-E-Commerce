/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '..'
import { Col, Image, Card, Form, FormControl, Button, ListGroupItem, Dropdown} from "react-bootstrap";
import {Navbar, Nav, Container, ListGroup} from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom';
import {SHOP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, BASKET_ROUTE} from '../utils/consts'
import {observer} from 'mobx-react-lite'
import {FaShoppingCart, FaUserCog} from 'react-icons/fa'
import { fetchTypes, fetchProducts, fetchCategories } from '../http/productAPI';
import {ImExit} from 'react-icons/im'
import './styles.css'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const {product} = useContext(Context)
    // const value = localStorage.getItem('token')
    // console.log(value)
    useEffect(() => {
        fetchCategories().then(data => product.setCategories(data))
    }, [product])
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <div className="navbar d-inline-block">
            <div fixed="top" className='d-flex navbar-header justify-content-between align-items-center'>
                <NavLink to={SHOP_ROUTE} className="text-center flex-grow brand ml-auto col-md-3 col-sm-3 col-3" activeclassname="active">militant.ua</NavLink>
                { user.isAuth ?
                <Nav className="justify-content-around align-items-center d-flex col-md-3 col-sm-3 col-3">               
                    <FaShoppingCart to={BASKET_ROUTE} onClick={() => history.push(BASKET_ROUTE)} className="link d-inline-block flex-fill mr-5 icon" activeclassname="active"/>
                    <FaUserCog to={ADMIN_ROUTE} onClick={() => history.push(ADMIN_ROUTE)} className="link d-inline-block flex-fill mr-5 icon" activeclassname="active"/>
                    <ImExit to={LOGIN_ROUTE} onClick={() => logOut()} className="link mr-5 d-inline-block flex-fill icon" activeclassname="active"/>                    
                </Nav>
                :
                <Nav className="d-flex mr-5 col-md-3 col-sm-3 col-3 flex-column align-items-center">
                    <NavLink className="link col align-baseline" activeClassName="active" to={LOGIN_ROUTE} onClick={() => history.push(LOGIN_ROUTE)}>Авторизація</NavLink>
                </Nav>
                }
            </div>
            <ListGroup horizontal className='navbar-category rounded-0'>
                {product.categories.map(category =>
                    <ListGroup.Item
                    className="category d-inline-block flex-fill rounded-0"
                    style={{cursor:'pointer'}} 
                    // onClick={() => product.setSelectedCategory(category)}
                    key={category.id}
                    >
                        <Image
                        className="category-img"
                        src={process.env.REACT_APP_API_URL + category.img}
                        />
                        <Dropdown>
                        <Dropdown.Toggle 
                        className='d-flex flex-grow category-caption text-center font'
                        as="span"
                        >
                            {category.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='rounded-0 typebar-menu p-0'>
                        {product.productTypes.map(productType =>
                            {
                                if(productType.categoryId === category.id)
                                return <Dropdown.Item
                                className= {productType.id === product.selectedType.id ? 'typebar-item-active font typebar-item' : 'font typebar-item'}
                                style={{cursor:'pointer'}} 
                                key={productType.id}
                                onClick={() => product.setSelectedType(productType)}
                                >
                                    {productType.name}
                                </Dropdown.Item>
                                return null
                            }
                            )}
                        </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>       
                    )}
            </ListGroup>
        </div>
    );
});

export default NavBar