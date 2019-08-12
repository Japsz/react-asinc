import {
  ADD_FAV_EPISODE_ERROR,
  ADD_FAV_EPISODE_INIT,
  ADD_FAV_EPISODE_SUCCESS,
  GET_EPISODES_ERROR,
  GET_EPISODES_INIT,
  GET_EPISODES_SUCCESS
} from "./const";

import {getEpisodesPage} from "./server";
import {putUser} from "../users/server";

export const getEpisodesAction = url => {
  return dispatch => {
    dispatch({type: GET_EPISODES_INIT});
    getEpisodesPage(url).then(response => {
      let {favoriteEpisodes} = JSON.parse(localStorage.getItem('user'))
      response.data.results = response.data.results.map((episode) => {
        let arrayAux = favoriteEpisodes.filter(idepisode => {
          return parseInt(idepisode) === parseInt(episode.id)
        })
        if(arrayAux.length) {
          episode.isFav = true
        } else episode.isFav = false
        return episode
      })
      dispatch({type: GET_EPISODES_SUCCESS, payload: response.data})
    }).catch(() => {

      dispatch({type: GET_EPISODES_ERROR})
    })
  }
};

export const handleFavoriteByIdAction = id => {
  return dispatch => {
    dispatch({type: ADD_FAV_EPISODE_INIT});
    let user = JSON.parse(localStorage.getItem('user'))
    if (user.favoriteEpisodes.filter((item) => parseInt(item) === parseInt(id)).length) {
      user.favoriteEpisodes = user.favoriteEpisodes.filter((item) => parseInt(item) !== parseInt(id))
    } else {
      user.favoriteEpisodes = [...user.favoriteEpisodes, id.toString()]
    }
    putUser(user).then(response => {
      dispatch({type: ADD_FAV_EPISODE_SUCCESS, payload: user})
    }).catch(() => {
      dispatch({type: ADD_FAV_EPISODE_ERROR})
    })
  }
};