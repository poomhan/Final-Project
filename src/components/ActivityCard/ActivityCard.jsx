import React, {useMemo, useState} from 'react';
import {Box, createTheme, Menu, MenuItem, ThemeProvider} from '@mui/material';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';
import './ActivityCard.css';
import ActionMenu from "../ActionMenu/ActionMenu.jsx";
import dayjs from "dayjs";
import run from "../../../../public/run-desk.png";

function ActivityCard({ topic, description, calories, date, type, onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpenMenu = Boolean(anchorEl)

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const renderChipType = (activityType) => {
    switch (activityType) {
      case 'running': return <Chip label="Run" color="primary" className='Tag-run'/>
      case 'swimming': return <Chip label="Swim" color="primary" className='Tag-swim'/>
      case 'hiking': return <Chip label="Hike" color="primary" className='Tag-hike'/>
      case 'biking': return <Chip label="Bicycle" color="primary" className='Tag-ride'/>
    }
  }

  const getActivityImage = (activityType) => {
    return {
      'running': {run},
      'swimming': '../../../../public/swim-desk.png',
      'hiking': '../../../../public/hiking-desk.png',
      'biking': '../../../../public/ride-desk.png'
    }[activityType]
  }

  const dateFormat = useMemo(() => dayjs(date).format('DD MMM YYYY'), [])

  return (
    <Box display="flex" flexDirection="row" alignItems="stretch">
      <MuiCard
        sx={{ maxWidth: 345 , maxHeight: 436, borderRadius: '20px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)' }}
        className='Run-card'
      >
        <CardHeader
          action={
            <div>
              <IconButton aria-label="settings" onClick={handleOpenMenu} >
                <MoreVertIcon />
              </IconButton>
              <ActionMenu
                open={isOpenMenu}
                onClose={handleCloseMenu}
                anchorEl={anchorEl}
              >
                <MenuItem onClick={onEdit}>edit</MenuItem>
                <MenuItem onClick={onDelete}>delete</MenuItem>
              </ActionMenu>
            </div>
          }
          subheader={dateFormat}
          title={
            <div>
              <Box>
                {
                  renderChipType(type)
                }
              </Box>
              {topic}
            </div>
          }
        />
        <CardMedia
          component="img"
          height="188"
          image={getActivityImage(type)}
          alt={type}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <br />
          <Typography variant="body2" className='Calories'>
            Calories {calories.toLocaleString()} kcal 🔥
          </Typography>
        </CardContent>
      </MuiCard>
    </Box>
  );
}

export default ActivityCard
