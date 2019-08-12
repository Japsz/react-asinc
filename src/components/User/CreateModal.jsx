import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Modal, Form, Button} from "react-bootstrap";
import {addUserAction, resetAdd} from "../../store/users/actions";

const CreateModal = props => {

  const [formVal, setFormVal] = useState({name:'', email: '', password: '', favoriteEpisodes: [], favoriteCharacters: []})

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addUser(formVal)
  }
  const handleOnChange = ({target: {value, name}}) => {
    setFormVal({
      ...formVal,
      [name]: value,
    })
  }
  const {isErrored, errMsg, isSuccess, resetAdd, onHide} = props

  useEffect(() => {
    if (isErrored) alert(errMsg)
    else if (isSuccess) {
      alert('Usuario creado exitosamente')
      resetAdd()
      onHide()
    }
  }, [isErrored, errMsg, isSuccess, resetAdd, onHide])

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        Regístrate
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type='text' name='name' value={formVal.name} onChange={handleOnChange} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Correo</Form.Label>
              <Form.Control type='text' name='email' value={formVal.email} onChange={handleOnChange} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type='password' name='password' value={formVal.password} onChange={handleOnChange} required/>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type={'button'} variant={'default'} onClick={props.onHide}>Cerrar</Button>
          <Button type={'submit'} variant={'primary'}>Registrar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isErrored: state.users.addUserError,
  isLoading: state.users.addUserLoading,
  errMsg: state.users.addUserErrMsg,
  isSuccess: state.users.addUserSuccess,
})

const mapDispatchToProps = dispatch => ({
  addUser: payload => dispatch(addUserAction(payload)),
  resetAdd: payload => dispatch(resetAdd(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);