import {
  ADD_FAV_CHARACTER_ERROR,
  ADD_FAV_CHARACTER_INIT,
  ADD_FAV_CHARACTER_SUCCESS,
  GET_CHARACTERS_ERROR,
  GET_CHARACTERS_INIT,
  GET_CHARACTERS_SUCCESS
} from "./const";

import {getCharactersPage} from "./server";
import {putUser} from "../users/server";

export const getCharactersAction = url => {
  return dispatch => {
    dispatch({type: GET_CHARACTERS_INIT});
    getCharactersPage(url).then(response => {
      let {favoriteCharacters} = JSON.parse(localStorage.getItem('user'))
      response.data.results = response.data.results.map((character) => {
        let arrayAux = favoriteCharacters.filter(idcharacter => {
          return parseInt(idcharacter) === parseInt(character.id)
        })
        if(arrayAux.length) {
          character.isFav = true
        } else character.isFav = false
        return character
      })
      dispatch({type: GET_CHARACTERS_SUCCESS, payload: response.data})
    }).catch(() => {
      dispatch({type: GET_CHARACTERS_ERROR})
    })
  }
};

export const handleFavoriteByIdAction = id => {
  return dispatch => {
    dispatch({type: ADD_FAV_CHARACTER_INIT});
    let user = JSON.parse(localStorage.getItem('user'))
    if (user.favoriteCharacters.filter((item) => parseInt(item) === parseInt(id)).length) {
      user.favoriteCharacters = user.favoriteCharacters.filter((item) => parseInt(item) !== parseInt(id))
    } else {
      user.favoriteCharacters = [...user.favoriteCharacters, id.toString()]
    }
    putUser(user).then(response => {
      dispatch({type: ADD_FAV_CHARACTER_SUCCESS, payload: user})
    }).catch(() => {
      dispatch({type: ADD_FAV_CHARACTER_ERROR})
    })
  }
};