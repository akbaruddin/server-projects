import Axios from "axios";

console.log(process.env.BASE_URL)
const api = Axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api;