import axios from 'axios'

const api = axios.create({
  baseURL: 'https://edrivingreboot.herokuapp.com/api'
})

export default { api }
