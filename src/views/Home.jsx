import React, {useEffect, useState} from 'react';
import {getUsers} from "../store/users/server";
import {Col, Container, Row} from "react-bootstrap";

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [relatedUsers, setRelatedUsers] = useState([])

  useEffect(() => {
    getUsers().then(response => {
      response.data = response.data.filter((item) => {
        return item.id !== user.id
      })
      let array = response.data.map((item) => {
        let favEpisodesMatches = 0
        let favCharactersMatches = 0
        //se compara la cantidad de coincidencias en episodios
        item.favoriteEpisodes.forEach((item) => {
          if (user.favoriteEpisodes.includes(item))  favEpisodesMatches++
        })
        //se compara la cantidad de coincidencias en personajes
        item.favoriteCharacters.forEach((item) => {
          if (user.favoriteCharacters.includes(item)) {favCharactersMatches++}
        })
        //se retorna solo el nombre y las coincidencias
        return {
          name: item.name,
          episodesMatches: favEpisodesMatches,
          characterMatches: favCharactersMatches,
        }
      })
      // se orden el arreglo según suma de las coincidencias por usuario de mayor a menor
      array.sort((a, b) => (b.characterMatches + b.episodesMatches) - (a.characterMatches + a.episodesMatches))
      setRelatedUsers(array)
    }).catch(() => {
      alert('Problemas de conexión')
    })
  }, [user])
  return (
    <Container>
      <Row>
        <h3 >Usuarios con gustos similares</h3>
      </Row>
      <Row>
        <Col md={{span:8, offset:2}}>
          <ul>
            {
              relatedUsers.map((item, idx) => {
                return(
                  <li key={idx}>
                    {item.name}
                    <ul>
                      <li>Episodios favoritos en común: {item.episodesMatches}</li>
                      <li>Personajes favoritos en común: {item.characterMatches}</li>
                    </ul>
                  </li>
                )
              })
            }
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;