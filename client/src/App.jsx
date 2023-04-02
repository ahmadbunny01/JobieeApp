import "./css/index.css";
import "./css/style.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import {
  Profile,
  AllJobs,
  AddJob,
  EditJob,
  Stats,
  SharedLayout,
} from "./pages/dashboard/main";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="profile" element={<Profile />} />
          <Route path="jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="edit-job" element={<EditJob />} />
        </Route>
        <Route path="/landing" exact element={<Landing />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="*" exact element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
