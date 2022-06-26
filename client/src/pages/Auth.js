/* eslint-disable no-unused-vars */
import React, {useContext, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import { observer } from 'mobx-react-lite';
import { Container, Form } from 'react-bootstrap'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {getUser, login, registration} from "../http/userAPI";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async() => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(nickname, email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container 
        className="d-flex font justify-content-center align-items-center"
        style={{height: window.innerHeight-54}}
        >
        <Card style={{width: 600}} className="p-5">
            <h2 className="m-auto">{isLogin ? "Авторизація" : "Реєстрація"}</h2>
            <Form className="d-flex flex-column">
                    { isLogin ?
                    <div>
                        <Form.Control
                        className="mt-3"
                        placeholder="Введіть ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    </div>
                :
                <div>
                        <Form.Control
                            className="mt-3"
                            placeholder="Введіть ваш нікнейм..."
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введіть ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введіть ваш пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                </div>
                }
                <Row className="d-flex justify-content-between mt-3 pl-3 pr-3"> 
                {  isLogin ?        
                <div className={"col-md-8"}>
                    Немає аккаунту? <NavLink to={REGISTRATION_ROUTE}>Зареєструйтесь!</NavLink>
                </div>
                :
                <div className={"col-md-8"}>
                    Є аккаунт? <NavLink to={LOGIN_ROUTE}>Увійдіть!</NavLink>
                </div>
                }
                <div 
                className="d-flex justify-content-evenly delete font adminbutton col-4" 
                onClick={click}
                style={{cursor:"pointer"}}
                >
                    <span>{isLogin ? 'Увійти' : 'Реєстрація'}</span>
                </div>
                {/* <Button size="sm col-md-4" variant={"outline-warning"} onClick={click}>{isLogin ? 'Увійти' : 'Реєстрація'}</Button> */}
                </Row>         
            </Form>
        </Card>
        </Container>
    );
});

export default Auth