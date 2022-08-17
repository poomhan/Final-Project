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
import {useCallback, useContext, useEffect, useState} from "react";
import dayjs from "dayjs";
import {useForm, Controller} from "react-hook-form";
import {AppContext} from "../../../contexts/AppContext.jsx";
import {updateProfile} from "../../../api/me.js";

export const Setting = () => {
  const context = useContext(AppContext)
  const {
    register,
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      birthdate: null,
      name: '',
      height: null,
      weight: null,
      gender: ''
    }
  })

  useEffect(() => {
    if (context.name) {
      reset({
        name: context.name,
        birthdate: context.birthdate,
        gender: context.gender,
        height: context.height,
        weight: context.weight
      })
    }
  }, [context])

  const values = watch()

  const updateProfileState = useCallback((values) => {
    context?.setName(values.name)
    context?.setBirthDate(values.birthdate)
    context?.setHeight(values.height)
    context?.setWeight(values.weight)
    context?.setGender(values.gender)
  }, [])

  const onSubmit = useCallback(async (values) => {
    const birthdate = dayjs(values.birthdate).toISOString();
    try {
      const payload = {...values, birthdate}
      await updateProfile(payload)
      updateProfileState(payload)
      alert('Update profile success')
    } catch (err) {
      alert('Update profile failed')
    }
  }, [])

  const onKeyDown = useCallback((e) => {
    const key = e.key
    console.log(key)
    if (/[-\+,\.e]/.test(key) && key.length <= 1) {
      e.preventDefault()
    }
  }, [])

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', height: 'calc(100vh - 64px)'}}>
      <Paper sx={{paddingY: '42px', paddingX: 10, width: '100%', borderRadius: '16px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.09);' }}>
        <Typography fontSize='xx-large' fontWeight='500' component='h1' mb={5}>Setting</Typography>
        <Box display='flex' mb={8}>
          <Box flexGrow='1' display='flex' alignItems='center' justifyContent='center'>
            <WorkOutImage />
          </Box>
          <Box>
            <Stack spacing={4}>
              <TextField
                sx={{width: '300px'}}
                label="Name"
                variant="outlined"
                placeholder='Input your name'
                error={errors.name}
                {...register('name', { required: true })}
              />
              <Controller
                control={control}
                rules={{required: true}}
                name='birthdate'
                render={({ field: { onChange, value, onBlur }}) => (
                  <DatePicker
                    label='Birthday'
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
                    }} error={errors.birthdate} />}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
              />
              <FormControl error={errors.gender}>
                <InputLabel id='gender-select-label'>Gender</InputLabel>
                <Select
                  sx={{width: '300px'}}
                  id='gender-select'
                  labelId='gender-select-label'
                  label='Gender'
                  placeholder='Select your gender'
                  {...register('gender', { required: true })}
                  value={values.gender}
                >
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                  <MenuItem value='nonBinaryGender'>Non-binary gender</MenuItem>
                </Select>
              </FormControl>
              <TextField
                error={errors.height}
                type='number'
                onKeyDown={onKeyDown}
                sx={{width: '300px'}}
                label='Height' placeholder='Input your height' variant="outlined"
                {...register('height', { required: true })}
              />
              <TextField
                error={errors.weight}
                type='number'
                onKeyDown={onKeyDown}
                sx={{width: '300px'}}
                label='Weight' placeholder='Input your weight' variant="outlined"
                {...register('weight', { required: true })}
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
