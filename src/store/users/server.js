import axios from 'axios';

export const getUsers = async () => await axios.get('http://localhost:3000/users');

export const getUser = async id => await axios.get(`http://localhost:3000/users/${id}`);

export const getLogin = async () => await axios.get(`http://localhost:3000/login`);

export const putUser = async (user) => await axios.put(`http://localhost:3000/users/${user.id}`, user) ;

export const postUser = async (user) => await axios.post(`http://localhost:3000/users`, user) ;
