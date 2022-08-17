import React from 'react';
import {Menu, styled} from "@mui/material";

const ActionMenu = styled((props) => (
  <Menu
    elevation={1}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({theme}) => ({
  '& .MuiPaper-root': {
    borderRadius: '4px',
    backgroundColor: 'white',
    '& .MuiMenu-list': {
      padding: 0,
      '& .MuiMenuItem-root': {
        display: 'block',
        color: '#BEBEBE',
        textAlign: 'center',
        fontSize: theme.typography.body1.fontSize
      }
    }
  }
}))

export default ActionMenu;
