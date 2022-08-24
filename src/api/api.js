import axios from "axios";

export const host = 'https://final-project-backend-ten.vercel.app'

export const api = axios.create({
  baseURL: `${host}/api/v1`
})
