import React from 'react';
import Typography from "@mui/material/Typography";
import './GradiantText.css'

const GradiantText = ({ children, ...props }) => {
  return (
    <Typography component='span' className='gradiant-text' {...props}>
      { children }
    </Typography>
  );
};

export default GradiantText;
