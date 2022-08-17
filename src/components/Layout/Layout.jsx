import {useContext, useEffect} from "react";
import {Outlet, useNavigate} from "react-router";
import Navbar from "../navbar/navbar";
import {getAuth} from "firebase/auth";
import {AppContext} from "../../contexts/AppContext.jsx";
import {Box} from "@mui/material";
import GradiantText from "../GradiantText/GradiantText.jsx";
import {useLocation} from "react-router-dom";
import {getMe} from "../../api/me.js";

const Layout = () => {
  const context = useContext(AppContext)

  const navigate = useNavigate()
  const location = useLocation()

  const setupProfile = async () => {
    const response = await getMe()
    if (response.data) {
      if (!context) return
      const result = response.data.result
      context.setName(result.name)
      context.setBirthDate(result.birthdate)
      context.setGender(result.gender)
      context.setHeight(result.height || 0)
      context.setWeight(result.weight || 0)
    }
  }

  useEffect(() => {
    const auth = getAuth()
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (!context.name) {
          await setupProfile()
        }
        context?.setIsLoggedIn(true)
        if (/^\/(sign-in|sign-up)/.test(location.pathname)) {
          navigate('/')
        }
      } else {
        context?.setIsLoggedIn(false)
        if (!/^\/(sign-in|sign-up)/.test(location.pathname)) {
          navigate('/sign-in')
        }
      }
    })
  }, [context])

  if (context?.isLoggedIn == null) return (
    <Box width='100vw' height='100vh' display='flex' justifyContent='center' alignItems='center'>
      <GradiantText fontSize='xxx-large'>Loading...</GradiantText>
    </Box>
  )

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
