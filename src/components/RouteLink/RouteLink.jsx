import React from 'react';
import Typography from "@mui/material/Typography";
import GradiantText from "../GradiantText/GradiantText.jsx";
import Link from "@mui/material/Link";
import {useLocation} from "react-router-dom";
import {useNavigate, useRoutes} from "react-router";

const RouteLink = ({ href = '#', currentPathname, text = '' }) => {
  const navigate = useNavigate()

  return (
    <Link sx={{cursor: 'pointer'}} onClick={() => navigate(href)} underline='none'>
      {
        currentPathname !== href ? (
          <Typography color='lightgray'>{text}</Typography>
        ) : (
          <GradiantText>{text}</GradiantText>
        )
      }
    </Link>
  );
};

export default RouteLink;
