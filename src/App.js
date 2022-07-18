import { useEffect, Suspense, lazy } from "react";
import { Switch, useHistory } from 'react-router-dom';
import AOS from "aos";
import { I18nextProvider } from "react-i18next";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import NavScrollTop from './components/NavScrollTop';


import { useAuth } from './context/AuthContext';
// CSS File Here
import 'antd/dist/antd.min.css';
import "aos/dist/aos.css";
import "./assets/css/fonts/fonts.css";
import "./assets/css/vendor/animate.css";
import "./assets/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./assets/scss/style.scss";
import language from './utils/language';
import NotFound from "./pages/NotFound";
import config from "./utils/config";
import { getSystemSettings, setSystemSettings } from "./utils";
import * as api from "./utils/api";

const Home = lazy(() => import('./pages/Home'));
const Quizplay = lazy(() => import('./pages/Quizplay'));
const Login = lazy(() => import('./components/smalltopheader/Login'));
const SignUp = lazy(() => import('./components/smalltopheader/SignUp'));
const Otpverify = lazy(() => import('./components/smalltopheader/Otpverify'));
const QuizZone = lazy(() => import('./pages/QuizZone'));
const ResetPassword = lazy(() => import('./components/smalltopheader/ResetPassword'));
const DashboardPlay = lazy(() => import('./components/Quiz/DashboardPlay'));
const Profile = lazy(() => import('./pages/Profile'));

const Bookmark = lazy(() => import("./pages/Bookmark"));
const Instruction = lazy(() => import("./pages/Instruction"));
const Invite_friends = lazy(() => import("./pages/Invite_friends"));
const PrivateRoute = lazy(() => import("./Routes/PrivateRoute"));
const PublicRoute = lazy(() => import("./Routes/PublicRoute"));
const LeaderBoard = lazy(() => import("./pages/LeaderBoard"));
const Contact_us = lazy(() => import("./pages/Contact-us"));
const About_us = lazy(() => import("./pages/About-us"));
const BookmarkPlay = lazy(() => import("./pages/BookmarkPlay"));
// const NotFound = lazy(() => import("./pages/NotFound"));
const TermAndConditions = lazy(() => import("./pages/TermAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Maintainance = lazy(() => import("./pages/Maintainance"));
const DailyQuizDashboard = lazy(() => import("./components/Quiz/DailyQuizDashboard"));

var i = 0;

const MySwal = withReactContent(Swal);

const App = () => {
  const { signout } = useAuth();
  const history = useHistory();
  useEffect(() => {
    AOS.init({
      offset: 80,
      duration: 1000,
      once: true,
      easing: 'ease',
    });
    AOS.refresh();


    api.getSystemConfigurations().then((response) => {
      if (!response.error) {
          setSystemSettings(response.data);
      }
    })

    const { app_maintenance } = getSystemSettings();

    if (app_maintenance === "1") {
      history.push("/Maintainance")
      console.log("hello")

    } else {
      history.push("/")
    }

  }, [])


  axios.interceptors.response.use(function (response) {
    if (!config.demo &&response.data && response.data.message === "129") {
      MySwal.fire({
        text: "You are already Logged in other Device",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Logout',
      }).then((result) => {
        if (result.isConfirmed) {
          signout();
          localStorage.clear();
          history.push("/");
          return false;
        }
      });

    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (i === 0) {
      toast.error("Network Error Occured");
      i = 1;
    } else {
      i = 0;
    }
    return Promise.reject(error);
  });
  return (

    <I18nextProvider i18n={language}>
      <ToastContainer />
      <NavScrollTop>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <PublicRoute path={`${"/"}`} exact component={Home} />
            <PublicRoute path={`${"/home"}`} exact component={Home} />
            <PublicRoute restricted={true} path={`${"/Login"}`} exact component={Login} />
            <PublicRoute restricted={true} path={`${"/SignUp"}`} exact component={SignUp} />
            <PublicRoute restricted={true} path={`${"/Otpverify"}`} exact component={Otpverify} />
            <PublicRoute restricted={true} path={`${"/ResetPassword"}`} exact component={ResetPassword} />
            <PublicRoute path={`${"/Instruction"}`} exact component={Instruction} />
            <PublicRoute path={`${"/Quizplay"}`} exact component={Quizplay} />
            <PublicRoute path={`${"/contact-us"}`} exact component={Contact_us} />
            <PublicRoute path={`${"/about-us"}`} exact component={About_us} />
            <PublicRoute path={`${"/terms-conditions"}`} exact component={TermAndConditions} />
            <PublicRoute path={`${"/privacy-policy"}`} exact component={PrivacyPolicy} />

            <PrivateRoute path={`${"/LeaderBoard"}`} exact component={LeaderBoard} />
            <PrivateRoute path={`${"/QuizZone"}`} exact component={QuizZone} />
            <PrivateRoute path={`${"/DashboardPlay"}`} exact component={DashboardPlay} />
            <PrivateRoute path={`${"/DailyQuizDashboard"}`} exact component={DailyQuizDashboard} />
            <PrivateRoute path={`${"/Profile"}`} exact component={Profile} />
            <PrivateRoute path={`${"/Bookmark"}`} exact component={Bookmark} />
            <PrivateRoute path={`${"/play-bookmark-questions"}`} exact component={BookmarkPlay} />
            <PrivateRoute path={`${"/Invite_friends"}`} exact component={Invite_friends} />
            <PrivateRoute path={`${"/Maintainance"}`} exact component={Maintainance} />
            <PublicRoute exact component={NotFound} />
          </Switch>
        </Suspense>
      </NavScrollTop>
    </I18nextProvider >
  );
}
export default App;