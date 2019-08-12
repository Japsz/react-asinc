import React, {useEffect, useState} from 'react'
import {Container, Row, Col, Card, Form, Button} from "react-bootstrap"
import {connect} from "react-redux"
import {getLoginAction, resetLogin} from "../store/users/actions"
import {Redirect} from "react-router-dom"
import CreateModal from "../components/User/CreateModal";

const Login = props => {
  const [credentials, setCredentials] = useState({email: '', password: ''})

  const [showModal, setShowModal] = useState(false)
  const handleOnChange = ({target: {name, value}}) => {
    setCredentials({
      ...credentials,
      [name]: value
    })
  }
  const handleLogin = (e) => {
    e.preventDefault()
    props.getLogin(credentials)
  }
  const {isLoginError, errMsg, isSuccess, resetLogin} = props
  useEffect(() => {
    if (isLoginError) alert(errMsg)
    else if (isSuccess) {
      resetLogin()
      window.history.push('/')
    }
  }, [isLoginError, errMsg, isSuccess, resetLogin])
  const token = localStorage.getItem('token')
  if (token) {
    return(<Redirect to={'/'}/>)
  }
  return (
    <Container>
      <Row>
        <Col md={{span:8, offset:2}}>
          <Card>
            <Card.Header>
              <h2>Ingreso de Usuarios</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type={'email'} name={'email'} value={credentials.email} onChange={handleOnChange} required/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type={'password'} name={'password'} value={credentials.password} onChange={handleOnChange} required/>
                </Form.Group>
                <Button type={'submit'} variant={'primary'} className='align-self-center'>Entrar</Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button type={'button'} variant="info" className='float-right' onClick={() => setShowModal(true)}>Crea una cuenta</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <CreateModal show={showModal} onHide={() => setShowModal(!showModal)}/>
    </Container>
  )
}

const mapDispatchToProps = dispatch => ({
  getLogin: payload => dispatch(getLoginAction(payload)),
  resetLogin: payload => dispatch(resetLogin(payload))
})

const mapStateToProps = state => ({
  isLoginLoading: state.users.loginLoading,
  isLoginError: state.users.loginError,
  errMsg: state.users.loginErrMsg,
  isLoginSuccess: state.users.loginSuccess,
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)