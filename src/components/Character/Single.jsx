import React, {useState} from 'react';
import {Card, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {handleFavoriteByIdAction} from "../../store/characters/actions";
import {connect} from "react-redux";
import './Single.css'

const Single = props => {
  const {obj} = props
  const [isFav, setFav] = useState(obj.isFav)

  const handleClick = () => {
    props.setFav(obj.id)
    setFav(!isFav)
  }
  return (
    <Col md={4} style={{padding: '1%'}}>
      <Card>
        <Card.Img variant={'top'} src={obj.image}/>
        <Card.Body>
          <Card.Title><strong>{obj.name}</strong> <small>{obj.gender}</small></Card.Title>
          <Card.Subtitle>{obj.species} - {obj.status}</Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <div className="float-right favorites">
            <FontAwesomeIcon icon="star" color={isFav ? 'yellow' : 'black'} onClick={handleClick}/>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
};
const mapDispatchToProps = dispatch => ({
  setFav: payload => dispatch(handleFavoriteByIdAction(payload)),
})

export default connect(null, mapDispatchToProps)(Single);