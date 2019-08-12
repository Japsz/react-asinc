import {initialState} from "./initialState";
import {
  ADD_FAV_CHARACTER_ERROR,
  ADD_FAV_CHARACTER_INIT,
  ADD_FAV_CHARACTER_SUCCESS,
  GET_CHARACTERS_ERROR,
  GET_CHARACTERS_INIT,
  GET_CHARACTERS_SUCCESS
} from "./const";

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS_INIT: {
      return {
        ...state,
        charactersLoading: true
      }
    }
    case GET_CHARACTERS_SUCCESS: {
      return {
        ...state,
        characters: action.payload,
        charactersLoading: false,
        charactersError: false,
      }
    }
    case GET_CHARACTERS_ERROR: {
      return {
        ...state,
        characters: state.characters,
        charactersLoading: false,
        charactersError: true,
      }
    }
    case ADD_FAV_CHARACTER_INIT: {
      return {
        ...state,
        favCharacterLoading: true,
        favCharacterError: false,
      }
    }
    case ADD_FAV_CHARACTER_SUCCESS: {
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        ...state,
        favCharacterLoading: false,
        favCharacterError: false,
      }
    }
    case ADD_FAV_CHARACTER_ERROR: {
      return {
        ...state,
        favCharacterLoading: false,
        favCharacterError: true,
      }
    }
    default: {
      return state
    }
  }
}