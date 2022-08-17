import {useContext, useEffect} from "react";
import {AppContext, AppContextProvider} from "../../contexts/AppContext.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import Home from "./Home/Home.jsx";
import {Setting} from "./Setting/Setting.jsx";
import {Navigate, useNavigate} from "react-router";
import SignIn from "./Signin/SignIn.jsx";
import SignUp from "./SignUp/SignUp.jsx";
import {Box} from "@mui/material";
import GradiantText from "../GradiantText/GradiantText.jsx";
import {getAuth} from "firebase/auth";
import AddActivitiesData from "./AddData/AddData.jsx"


export const AppRouter = () => {
  const context = useContext(AppContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {
            context?.isLoggedIn ? (
              <>
                <Route index element={<Home />}></Route>
                <Route path="setting" element={<Setting />} />
                 <Route path="add-activity" exact element={<AddActivitiesData />} />
                 <Route path="edit-activity/:activityId" exact element={<AddActivitiesData />} />
              </>
            ) : (
              <>
                <Route index element={<Navigate to='sign-in' replace />} />
                <Route path="sign-in" exact element={<SignIn />} />
                <Route path="sign-up" exact element={<SignUp />} />
              </>
            )
          }
          <Route path='*' element={<Box width='100vw' height='calc(100vh - 64px)' display='flex' alignItems='center' justifyContent='center'>
            <GradiantText fontSize='xxx-large'>Not Found</GradiantText>
          </Box>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
