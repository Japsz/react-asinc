import React, {useEffect} from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {getEpisodesAction} from "../../store/episodes/actions";
import '../../assets/css/main.css'
import Episode from "./Single";


const Index = props => {

  const {episodes, episodesLoading, episodesError, getEpisodes} = props

  useEffect(() => {
    getEpisodes('https://rickandmortyapi.com/api/episode')
  }, [getEpisodes])
  const handlerClick = ({target: {value}}) => {
    props.getEpisodes(value)
  }
  if (episodesLoading) {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h2 className='page-title'>
              Episodios:
            </h2>
          </Col>
          <Col md={12}>
            <div className='loader'>Cargando...</div>
          </Col>
        </Row>
      </Container>
    );
  }
  if (episodesError) {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h2 className='page-title'>
              Episodios:
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
            Episodios:
          </h2>
        </Row>
        <Row>
            {
              episodes.results.map((item) => {
                return(<Episode key={item.id} obj={item}/>)
              })
            }
        </Row>
        <Row>
          <Col md={4}>
            {episodes.info.prev !== '' ? <Button type='button' variant={'primary'} className='float-right' value={episodes.info.prev} onClick={handlerClick}>Anterior</Button> : null}
          </Col>
          <Col md={{span: 4, offset: 4}}>
            {episodes.info.next !== '' ? <Button type='button' variant={'primary'} value={episodes.info.next} onClick={handlerClick}>Siguiente</Button> : null}
          </Col>
        </Row>
    </Container>
  );
};

const mapStateToProps = state => ({
  episodes: state.episodes.episodes,
  episodesLoading: state.episodes.episodesLoading,
  episodesError: state.episodes.episodesError
})

const mapDispatchToProps = dispatch => ({
  getEpisodes: payload => dispatch(getEpisodesAction(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(Index);