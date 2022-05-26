import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000'})


//login post request end point
export const login = (formData) => API.post('users/login', formData)
//sign up new user post request end point
export const signUp = (formData) => API.post('users/signUp', formData)

