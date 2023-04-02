import {
  useContext,
  useReducer,
  createContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  ADD_JOB_BEGIN,
  ADD_JOB_SUCCESS,
  ADD_JOB_ERROR,
  LOGOUT_USER,
  SET_USER_JOBS_BEGIN,
  SET_USER_JOBS_SUCCESS,
  EDIT_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  DELETE_JOB_BEGIN,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_ERROR,
  GET_STATS_BEGIN,
  GET_STATS_SUCCESS,
} from "./actions";
import reducer from "./reducer";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const location = localStorage.getItem("location");
const jobs = localStorage.getItem("jobs");
const stats = localStorage.getItem("stats");

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: location || "",
  jobLocation: location || "",
  userJobs: jobs ? JSON.parse(jobs) : null,
  editingJob: {},
  stats: stats ? JSON.parse(stats) : null,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const getStats = async () => {
    dispatch({ type: GET_STATS_BEGIN });
    try {
      const response = await axios.get("/api/v1/jobs/stats");
      const { pendings, interviews, declined } = response.data;
      dispatch({
        type: GET_STATS_SUCCESS,
        payload: {
          pendings: pendings,
          interviews: interviews,
          declined: declined,
        },
      });
      addStatsToLocalStorage({ pendings, interviews, declined });
    } catch (error) {
      console.log(error.response.type.msg);
    }
  };
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage({ user, token, location });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      clearAlert();
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
      clearAlert();
    }
  };
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage({ user, token, location });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      clearAlert();
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
      clearAlert();
    }
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await axios.patch("/api/v1/auth/update", currentUser);
      const { user, token, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage({ user, token, location });
      clearAlert();
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
      clearAlert();
    }
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const addJob = async (currJob) => {
    dispatch({ type: ADD_JOB_BEGIN });
    try {
      const response = await axios.post("/api/v1/jobs/add", currJob);
      const { createdJob } = response.data;
      dispatch({
        type: ADD_JOB_SUCCESS,
        payload: {
          createdJob: createdJob,
        },
      });
      clearAlert();
    } catch (error) {
      dispatch({
        type: ADD_JOB_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
      clearAlert();
    }
  };
  const fetchJobs = async () => {
    dispatch({ type: SET_USER_JOBS_BEGIN });
    try {
      const response = await axios.get("/api/v1/jobs");
      const { jobs } = response.data;
      dispatch({
        type: SET_USER_JOBS_SUCCESS,
        payload: {
          fetchedJobs: jobs,
        },
      });
      addJobsToLocalStorage(jobs);
    } catch (error) {
      console.log(error.response.data.msg);
      logoutUser();
    }
  };
  const setEditingJob = (job) => {
    dispatch({
      type: EDIT_JOB,
      payload: {
        job: job,
      },
    });
    navigate("edit-job");
  };
  const editJob = async (jobId, createdBy, currJob) => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const response = await axios.patch(`/api/v1/jobs/${jobId}`, {
        position: currJob.position,
        company: currJob.company,
        jobType: currJob.jobType,
        jobLocation: currJob.jobLocation,
        status: currJob.status,
        createdBy: createdBy,
      });
      const { updatedJob } = response.data;
      dispatch({
        type: EDIT_JOB_SUCCESS,
        payload: {
          updatedJob: updatedJob,
        },
      });
      clearAlert();
    } catch (error) {
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
      clearAlert();
    }
  };
  const deleteJob = async (job) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      const response = await axios.delete(`/api/v1/jobs/${job._id}`);
      const { msg } = response.data;
      removeJobFromLocalStorage(job);
      const newJobs = JSON.parse(localStorage.getItem("jobs"));
      dispatch({
        type: DELETE_JOB_SUCCESS,
        payload: {
          newJobs: newJobs,
          job: job,
          msg: msg,
        },
      });
      clearAlert();
    } catch (error) {
      dispatch({
        type: DELETE_JOB_ERROR,
      });
      clearAlert();
    }
  };
  const addStatsToLocalStorage = ({ pendings, interviews, declined }) => {
    let statsObj = {
      pendings: pendings,
      interviews: interviews,
      declined: declined,
    };
    statsObj = JSON.stringify(statsObj);
    localStorage.setItem("stats", statsObj);
  };
  const addJobsToLocalStorage = (jobs) => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  };
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
    localStorage.removeItem("jobs");
    localStorage.removeItem("stats");
  };
  const removeJobFromLocalStorage = (job) => {
    const currJobs = JSON.parse(localStorage.getItem("jobs"));
    const jobs = currJobs.filter((item) => item._id != job._id);
    localStorage.removeItem("jobs");
    localStorage.setItem("jobs", JSON.stringify(jobs));
  };
  return (
    <>
      <AppContext.Provider
        value={{
          ...state,
          displayAlert,
          clearAlert,
          registerUser,
          loginUser,
          updateUser,
          logoutUser,
          addJob,
          fetchJobs,
          setEditingJob,
          editJob,
          deleteJob,
          getStats,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
