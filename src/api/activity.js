import {getAuth} from "firebase/auth";
import {api} from "./api.js";
import dayjs from "dayjs";
import {timeToSecond} from "../libs/date.js";

export const createActivity = async ({ topic, date, duration, type, calories, description }) => {
  const auth = getAuth()
  if (!auth.currentUser) throw new Error('Unauthorized')
  const token = await auth.currentUser.getIdToken(true)

  return api.post('/activities', {
    topic,
    date: dayjs(date).toISOString(),
    duration: timeToSecond(duration),
    type,
    calories,
    description
  }, {
    headers: {
      Authorization: token
    }
  })
}

export const updateActivity = async (id, { topic, date, duration, type, calories, description }) => {
  const auth = getAuth()
  if (!auth.currentUser) throw new Error('Unauthorized')
  const token = await auth.currentUser.getIdToken(true)

  return api.put(`/activities/${id}`, {
    topic,
    date: dayjs(date).toISOString(),
    duration: timeToSecond(duration),
    type,
    calories,
    description
  }, {
    headers: {
      Authorization: token
    }
  })
}

export const getActivities = async () => {
  const auth = getAuth()
  if (!auth.currentUser) throw new Error('Unauthorized')
  const token = await auth.currentUser.getIdToken(true)
  return api.get('/activities', {
    headers: {
      Authorization: token
    }
  })
}

export const getActivityById = async (id) => {
  const auth = getAuth()
  if (!auth.currentUser) throw new Error('Unauthorized')
  const token = await auth.currentUser.getIdToken(true)
    return api.get(`/activities/${id}`, {
    headers: {
      Authorization: token
    }
  })
}

export const deleteActivity = async (id) => {
  const auth = getAuth()
  if (!auth.currentUser) throw new Error('Unauthorized')
  const token = await auth.currentUser.getIdToken(true)
  return api.delete(`/activities/${id}`, {
    headers: {
      Authorization: token
    }
  })
}
