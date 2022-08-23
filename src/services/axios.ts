import axios from 'axios'

const instanse = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
})

export default instanse
