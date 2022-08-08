import axios from 'axios'

const api = axios.create({
  baseURL: 'https://edrivingreboot.herokuapp.com/api'
})

export default {
  async login (email, password) {
    console.log(api)
    try {
      const response = await api.post('/auth/login', { email, password })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}
