import React, {useEffect} from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {getCharactersAction} from "../../store/characters/actions";
import '../../assets/css/main.css'
import Character from "./Single";

const Index = props => {

  const {characters, charactersLoading, charactersError, getCharacters} = props

  useEffect(() => {
    getCharacters('https://rickandmortyapi.com/api/character')
  }, [getCharacters])

  const handlerClick = ({target: {value}}) => {
    props.getCharacters(value)
  }
  if (charactersLoading) {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h2 className='page-title'>
              Personajes:
            </h2>
          </Col>
          <Col md={12}>
            <div className='loader'>Cargando...</div>
          </Col>
        </Row>
      </Container>
    );
  }
  if (charactersError) {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h2 className='page-title'>
              Personajes:
            </h2>
          </Col>
          <Col md={12}>
            <div className='loader'>Ha ocurrido un error, inténtalo nuevamente</div>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
        <Row>
          <h2 className='page-title'>
            Personajes:
          </h2>
        </Row>
        <Row>
            {
              characters.results.map((item) => {
                return(<Character key={item.id} obj={item}/>)
              })
            }
        </Row>
        <Row>
          <Col md={4}>
            {characters.info.prev !== '' ? <Button type='button' variant={'primary'} className='float-right' value={characters.info.prev} onClick={handlerClick}>Anterior</Button> : null}
          </Col>
          <Col md={{span: 4, offset: 4}}>
            {characters.info.next !== '' ? <Button type='button' variant={'primary'} value={characters.info.next} onClick={handlerClick}>Siguiente</Button> : null}
          </Col>
        </Row>
    </Container>
  );
};

const mapStateToProps = state => ({
  characters: state.characters.characters,
  charactersLoading: state.characters.charactersLoading,
  charactersError: state.characters.charactersError
})

const mapDispatchToProps = dispatch => ({
  getCharacters: payload => dispatch(getCharactersAction(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(Index);