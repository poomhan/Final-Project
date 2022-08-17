import React from 'react';
import GradiantText from "../GradiantText/GradiantText.jsx";
import Box from "@mui/material/Box";

const ValueCard = ({ title = '', value = '' }) => {
  return (
    <Box
      sx={{
      paddingY: 2,
      paddingX: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.5);',
      backdropFilter: 'blur',
      borderRadius: '20px',
      width: '193px'
    }}>
      <GradiantText whiteSpace='nowrap' display='block' marginBottom='10px'>{title}</GradiantText>
      <GradiantText lineHeight='40px' fontSize={40}>{value}</GradiantText>
    </Box>
  );
};

export default ValueCard;
