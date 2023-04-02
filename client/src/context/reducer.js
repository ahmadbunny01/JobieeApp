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
  SET_USER_JOBS_ERROR,
  EDIT_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  DELETE_JOB_BEGIN,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_ERROR,
  GET_STATS_BEGIN,
  GET_STATS_SUCCESS,
} from "../context/actions";

const reducer = (state, action) => {
  if (action.type == DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please Provide All Values.",
    };
  }
  if (action.type == CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type == REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type == REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User Created Successfully. Redirecting...",
    };
  }
  if (action.type == REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type == LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type == LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User Login Successful. Redirecting...",
    };
  }
  if (action.type == LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type == UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type == UPDATE_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User Updated Successfully.",
    };
  }
  if (action.type == UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type == LOGOUT_USER) {
    return {
      ...state,
    };
  }
  if (action.type == ADD_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type == ADD_JOB_SUCCESS) {
    return {
      ...state,
      jobLocation: action.payload.createdJob.jobLocation,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Job Added Successfully.",
    };
  }
  if (action.type == ADD_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type == SET_USER_JOBS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type == SET_USER_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userJobs: action.payload.fetchedJobs,
    };
  }
  if (action.type == EDIT_JOB) {
    return {
      ...state,
      editingJob: action.payload.job,
    };
  }
  if (action.type == EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type == EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Job Updated Successfully.",
    };
  }
  if (action.type == EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type == DELETE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type == DELETE_JOB_SUCCESS) {
    return {
      ...state,
      userJobs: action.payload.newJobs,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.msg,
    };
  }
  if (action.type == DELETE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Deletion Failed",
    };
  }
  if (action.type == GET_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type == GET_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: {
        pendings: action.payload.pendings,
        interviews: action.payload.interviews,
        declined: action.payload.declined,
      },
    };
  }
  throw new Error(`No Such Action : ${action.type}`);
};

export default reducer;
