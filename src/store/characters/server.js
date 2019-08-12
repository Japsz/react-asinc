import axios from 'axios';

export const getCharactersPage = async url => await axios.get(url);

export const getCharacterById = async id => await axios.get(`https://rickandmortyapi.com/api/character/${id}`);