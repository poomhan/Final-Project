import {createContext, useMemo, useState} from "react";
import { padString } from '../libs/common.js'

export const AppContext = createContext({})

export const AppContextProvider = ({ children }) => {
  // authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  // user state
  const [name, setName] = useState('')
  const [birthdate, setBirthDate] = useState(null)
  const [gender, setGender] = useState('')
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)

  // daily result state
  const [hasSetDailyResult, setHasSetDailyResult] = useState(false)
  const [date, setDate] = useState(new Date()) // อันนี้หลังบ้านต้องคืนค่ามาเป็น iso date format นะครับ เช่น 2022-08-02T00:00:00z
  const [totalDurationInHours, setTotalDurationInHours] = useState(0)
  const [totalDurationInMinutes, setTotalDurationInMinutes] = useState(0)
  const [totalDurationInSeconds, setTotalDurationInSeconds] = useState(0)
  const [caloriesBurned, setCaloriesBurned] = useState(0)

  const totalDuration = useMemo(() => {
    return `${padString(totalDurationInHours, '0')}:${padString(totalDurationInMinutes, '0')}:${padString(totalDurationInSeconds, '0')}`
  }, [
    totalDurationInSeconds,
    totalDurationInHours,
    totalDurationInMinutes
  ])

  const setTotalDuration = (h, m, s) => {
    setTotalDurationInHours(h)
    setTotalDurationInMinutes(m)
    setTotalDurationInSeconds(s)
  }

  // activities state
  // const [currentActivityId, setCurrentActivityId] = useState(null)
  // const [topic, setTopic] = useState('')
  // const [exerciseDate, setExerciseDate] = useState('')
  // const [type, setType] = useState('')
  // const [duration, setDuration] = useState('')
  // const [calories, setCalories] = useState('')

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      dailyResult: {
        hasSetDailyResult,
        setHasSetDailyResult,
        date,
        setDate,
        setTotalDuration,
        totalDuration,
        caloriesBurned,
        setCaloriesBurned
      },
      name,
      setName,
      birthdate,
      setBirthDate,
      gender,
      setGender,
      height,
      setHeight,
      weight,
      setWeight,
      // activityState: {
      //   currentActivityId,
      //   topic,
      //   exerciseDate,
      //   type,
      //   duration,
      //   calories,
      //   setCurrentActivityId,
      //   setTopic,
      //   setDuration,
      //   setType,
      //   setExerciseDate,
      //   setCalories
      // }
    }}>
      {children}
    </AppContext.Provider>
  )
}
