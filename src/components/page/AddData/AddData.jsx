import {
    Paper,
    Box,
    Container,
    Grid,
    Stack,
    Button,
    Typography,
    TextField,
    Select, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment,
  } from "@mui/material";
  import { DatePicker } from '@mui/x-date-pickers/DatePicker'
  import { ReactComponent as WorkOutImage } from '../../../assets/images/workout.svg'
  import { ReactComponent as CalendarIcon } from '../../../assets/icons/calendar.svg'
  import { ReactComponent as ClockIcon } from '../../../assets/icons/clock.svg'
  import {useCallback, useContext, useEffect, useState} from "react";
  import dayjs from "dayjs";
  import {useForm, Controller} from "react-hook-form";
  import {AppContext} from "../../../contexts/AppContext.jsx";
  import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {createActivity, getActivityById, updateActivity} from "../../../api/activity.js";
import {useNavigate, useParams} from "react-router";
import {secondToDate} from "../../../libs/date.js";

const defaultValues = {
  date: null,
  topic: '',
  duration: null,
  type: '',
  calories: null,
  description: ''
}

const AddActivitiesData = () => {
  const navigate = useNavigate()
  const param = useParams()
  const {
    register,
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues
  })
  const [loading, setLoading] = useState(false)


  const setupActivityForm = async () => {
    setLoading(true)
    const response = await getActivityById(param.activityId)
    const result = response.data.result
    console.log('duration', secondToDate(result.duration).toString())
    reset({
      topic: result.topic,
      date: result.date,
      duration: secondToDate(result.duration),
      type: result.type,
      calories: result.calories,
      description: result.description
    })
    setLoading(false)
  }

  useEffect(() => {
    if (param?.activityId) {
      setupActivityForm()
    }
  }, [param?.activityId])

  const values = watch()

  const onSubmit = useCallback(async (values) => {
    console.log({values})
    if (param?.activityId) {
      await updateActivity(param.activityId, values)
    } else {
      await createActivity(values)
    }
    navigate('/')
  }, [])

  const onKeyDown = useCallback((e) => {
    const key = e.key
    if (/[-\+,\.e]/.test(key) && key.length <= 1) {
      e.preventDefault()
    }
  }, [])

  return (
    <Container key={loading} sx={{ display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 64px)', paddingY: 4}}>
      <Paper sx={{paddingY: '42px', paddingX: 10, width: '100%', borderRadius: '16px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.09);' }}>
        <Typography fontSize='xx-large' fontWeight='500' component='h1' mb={5}>
          {
            param?.activityId ? 'Edit your data' : 'Add your data'
          }
        </Typography>
        <Box display='flex' mb={8} alignItems='center' justifyContent="center">
          <Box>
            <Stack spacing={4}>
              <TextField
                sx={{width: '300px'}}
                label="Topic"
                variant="outlined"
                placeholder='Input your topic'
                error={errors.topic}
                {...register('topic', { required: true })}
              />
              <Controller
                control={control}
                rules={{required: true}}
                name='date'
                render={({ field: { onChange, value, onBlur }}) => (
                  <DatePicker
                    label='Date'
                    inputFormat='DD/MM/YYYY'
                    renderInput={(props) => <TextField sx={{width: '300px'}} {...props} InputProps={{
                      ...props.InputProps,
                      endAdornment: (
                        <InputAdornment position='end' sx={{cursor: 'pointer'}}>
                          <CalendarIcon />
                          <Box position='absolute' right='0' marginRight={2} sx={{opacity: 0}}>
                            {props.InputProps.endAdornment}
                          </Box>
                        </InputAdornment>
                      )
                    }} error={errors.date} />}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
              />
              <Controller
                control={control}
                rules={{required: true}}
                name='duration'
                render={({ field: { onChange, value, onBlur }}) => (
                  <TimePicker
                    ampm={false}
                    openTo="hours"
                    views={['hours', 'minutes', 'seconds']}
                    inputFormat="HH:mm:ss"
                    mask="__:__:__"
                    label="Duration"
                    renderInput={(props) => <TextField sx={{width: '300px'}} {...props} InputProps={{
                      ...props.InputProps,
                      endAdornment: (
                        <InputAdornment position='end' sx={{cursor: 'pointer'}}>
                          <ClockIcon />
                          <Box position='absolute' right='0' marginRight={2} sx={{opacity: 0}}>
                            {props.InputProps.endAdornment}
                          </Box>
                        </InputAdornment>
                      )
                    }} error={errors.duration} />}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
              />
              <FormControl error={errors.type}>
                <InputLabel id='type-select-label'>Type</InputLabel>
                <Select
                  sx={{width: '300px'}}
                  id='type-select'
                  labelId='type-select-label'
                  label='Type'
                  placeholder='Select your type'
                  {...register('type', { required: true })}
                  value={values.type}
                >
                  <MenuItem value='running'>Running</MenuItem>
                  <MenuItem value='swimming'>Swimming</MenuItem>
                  <MenuItem value='hiking'>Hiking</MenuItem>
                  <MenuItem value='biking'>Biking</MenuItem>
                </Select>
              </FormControl>
              <TextField
                error={errors.calories}
                type='number'
                onKeyDown={onKeyDown}
                sx={{width: '300px'}}
                label='Calories' placeholder='Input your calories' variant="outlined"
                {...register('calories', { required: true })}
              />
              <TextField
                sx={{width: '300px'}}
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                placeholder='Input your description'
                error={errors.description}
                {...register('description', { required: true })}
              />
            </Stack>
          </Box>
        </Box>
        <Box
          justifyContent="center"
          width="100%"
          display="flex"
          paddingTop="8px"
        >
          <Button
            className="Primary-Button"
            sx={{ width: 300, height: '40px' }}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

 export default AddActivitiesData
