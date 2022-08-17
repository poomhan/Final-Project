import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import GradiantText from "../GradiantText/GradiantText.jsx";
import {useLocation} from "react-router";
import RouteLink from "../RouteLink/RouteLink.jsx";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../contexts/AppContext.jsx";
import {signOut} from "../../libs/authentication.js";

export default function Navbar() {
  const {pathname} = useLocation()
  const { name, setName, isLoggedIn } = useContext(AppContext)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 'none', borderBottom: '1px solid #E0E0E0' }}>
        <Toolbar sx={{ backgroundColor: "white" }}>
          { isLoggedIn && (
            <Box>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <RouteLink href='/' currentPathname={pathname} text='Dashboard' />
                <RouteLink href='/setting' currentPathname={pathname} text='Setting' />
              </Stack>
            </Box>
          )}
          <Box marginLeft='auto' display='flex' alignItems='center'>
            {(isLoggedIn) && (
              <>
                <Typography color='#414141'>{ name }</Typography>
                <Box display='flex'>
                  <Divider orientation='vertical' flexItem sx={{marginX: 2}} />
                  <Typography component='a' sx={{cursor: 'pointer'}} onClick={signOut} color='#414141'>Log out</Typography>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
