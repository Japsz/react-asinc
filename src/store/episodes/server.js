import axios from 'axios';

export const getEpisodesPage = async url => await axios.get(url);

export const getEpisodeById = async id => await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);