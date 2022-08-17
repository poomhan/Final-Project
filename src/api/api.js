import axios from "axios";

export const host = 'http://localhost:8080'

export const api = axios.create({
  baseURL: `${host}/api/v1`
})
