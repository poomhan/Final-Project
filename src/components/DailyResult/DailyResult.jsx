import {ReactComponent as AmicoImage} from '../../assets/images/amico.svg'
import SayHi from "../SayHi/SayHi.jsx";
import {Box, Grid, Typography} from "@mui/material";
import GradiantText from "../GradiantText/GradiantText.jsx";
import ValueCard from "../ValueCard/ValueCard.jsx";
import dayjs from 'dayjs'

import './DialyResult.css'
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {AppContext} from "../../contexts/AppContext.jsx";

const DailyResult = () => {
  const { name, setName, dailyResult = {} /* ถ้าไม่มีค่าให้ค่าเริ่มต้นเป็น {} */} = useContext(AppContext) // อันนี้สำหรับดึง name จาก app context ถ้า set จะเปลี่ยนทุกที่ที่เรียกใช้ useContext(AppContext)
  const { date, setDate, totalDuration, setTotalDuration, caloriesBurned, setCaloriesBurned } = dailyResult

  const isDateValid = useMemo(() => dayjs(date).isValid(), [date])

  return (
    <Box
      className='daily-container'
      display='flex'
      gap='42px'
      flexWrap='nowrap'
      borderRadius='38px'
    >
      <Box paddingY={1} paddingX={1.5} flexShrink='0'>
        <AmicoImage/>
      </Box>
      <Box display='flex' flexDirection='column'>
        <SayHi name={name}/>
        <Box
          flexGrow={1}
          padding='0 0 70px'
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          fontWeight='normal'
          fontSize='20px'
          lineHeight='40px'
          color='#414141'
        >
          <Typography
            fontSize='20px'
            whiteSpace='pre-wrap'
          >
            “If you want something you’ve never had, you must be willing to do something you’ve never done."
          </Typography>
          <Typography fontSize='20px' color='#414141'>- Thomas Jefferson -</Typography>
        </Box>
      </Box>
      <Box flexShrink='0'>
        <Box sx={{paddingTop: 3, textAlign: 'center', paddingRight: '42px'}}>
          <GradiantText fontSize='x-large' display='block' whiteSpace='nowrap'>Daily Result</GradiantText>
          <GradiantText fontSize='medium' display='block' marginBottom={1.5}>
            {
              isDateValid ? dayjs(date).format('DD MMM YYYY') : 'ไม่ระบุวันที่'
            }
          </GradiantText>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <ValueCard title='Total Duration' value={totalDuration}/>
            </Grid>
            <Grid item xs={6}>
              <ValueCard title='Calories Burned 🔥' value={caloriesBurned.toLocaleString()}/>
            </Grid>
          </Grid>
      </Box>
    </Box>
</Box>

)
}

export default DailyResult
