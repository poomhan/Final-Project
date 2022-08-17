import DailyResult from "../../DailyResult/DailyResult.jsx";

import './Home.css'
import '../../button/button.css'
import ActivityCard from "../../ActivityCard/ActivityCard.jsx";
import {Box, Button, Pagination} from "@mui/material";
import {useNavigate} from "react-router";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import {ReactComponent as PlusIcon} from '../../../assets/icons/plus.svg'
import {useCallback} from "react";
import Activities from "../../Activities/Activities.jsx";

const Home = () => {
  return (
    <div className='home-container'>
      <br />
      <DailyResult style={{ width: 325 }} />
      <Activities />
    </div>

  )
}

export default Home
