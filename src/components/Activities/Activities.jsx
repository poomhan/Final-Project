import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Box, Button, Pagination} from "@mui/material";
import {ReactComponent as PlusIcon} from "../../assets/icons/plus.svg";
import Grid from "@mui/material/Grid";
import ActivityCard from "../ActivityCard/ActivityCard.jsx";
import {useNavigate} from "react-router";
import {deleteActivity, getActivities} from "../../api/activity.js";
import * as R from 'rambda'
import dayjs from "dayjs";
import {AppContext} from "../../contexts/AppContext.jsx";
import {secondToDate} from "../../libs/date.js";

const Activities = () => {
  const navigate = useNavigate()
  const context = useContext(AppContext)
  const [activities, setActivities] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageLimit = 9
  const totalPage = useMemo(() => Math.ceil(activities.length / pageLimit), [activities])


  const handleEdit = (id) => () => {
    if (typeof id === 'undefined') return
    navigate('/edit-activity/'+id)
  }

  const handleDelete = (id) => async () => {
    if (typeof id === 'undefined') return
    await deleteActivity(id)
    setActivities((prev) => {
      const newActivities = [...prev]
      return newActivities.filter(({_id}) => _id !== id)
    })
  }

  const handleChangePage = (e, page) => {
    setCurrentPage(page)
  }

  const setDailyResult = async (results) => {
    if (!context) return
    const groupByDate = R.groupBy((activity) => dayjs(activity.date).format('YYYY-MM-DD'))
    const resultDateGroup = groupByDate(results)
    const pairDate = R.toPairs(resultDateGroup)
    const [latestDate, latestActivities] = R.sortBy(
      (a) => {
        return dayjs(a[0]).valueOf() // [0] is date string
      },
      pairDate
    ).reverse().at(0)
    const totalCalories = latestActivities.reduce((acc, cur) => acc + cur.calories, 0)
    const totalDurationInSecond = latestActivities.reduce((acc, cur) => acc + cur.duration, 0)
    const totalDuration = secondToDate(totalDurationInSecond)

    // set state
    context.dailyResult.setDate(new Date(latestDate)) // set date in format YYYY-MM-DD
    context.dailyResult.setCaloriesBurned(totalCalories)
    context.dailyResult.setTotalDuration(totalDuration.hour(), totalDuration.minute(), totalDuration.second())

    // console.log({resultDateGroup, latestDate, latestActivities, pairDate})
    console.log({totalCalories, totalDurationInSecond, totalDurationInTime})
    context.dailyResult.setHasSetDailyResult(true)
  }

  const getActivitiesList = async () => {
    const response = await getActivities()
    if (!response.data?.result?.length) return
    setActivities(() => [...response.data.result])
    setDailyResult(response.data.result)
  }

  useEffect(() => {
    getActivitiesList()
  }, [])

  return (
    <Box paddingX={12} paddingTop={8}>
      <h1>Your Activities</h1>
      <Button
        className='Secondary-Button'
        sx={{borderColor: 'rgba(178, 31, 31, 1)', mb: 4}}
        variant="outlined"
        onClick={() => navigate('/add-activity')}
        endIcon={<PlusIcon />}
      >
        Add your data
      </Button>
      <Grid container spacing={8} rowSpacing={5} wrap='wrap'>
        {activities.map(({ topic, description, date, type, calories, _id }) => (
          <Grid item xs={4} key={_id}>
            <ActivityCard
              topic={topic}
              description={description}
              type={type}
              date={date}
              calories={calories}
              onEdit={handleEdit(_id)}
              onDelete={handleDelete(_id)}
            />
          </Grid>
        )).slice((currentPage-1)*pageLimit, Math.min(((currentPage-1)*pageLimit) + pageLimit, activities.length))}
      </Grid>
      <Box py={6} display='flex' justifyContent='center'>
        <Pagination count={totalPage} page={currentPage} onChange={handleChangePage} color='primary' />
      </Box>
    </Box>
  );
};

export default Activities;
