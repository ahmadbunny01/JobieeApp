import Alert from "../../components/Alert";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const Profile = () => {
  const { isLoading, showAlert, displayAlert, clearAlert, user, updateUser } =
    useAppContext();
  const [initialState, setinitialState] = useState({
    name: user.name,
    email: user.email,
    location: user.location,
  });
  const { name, email, location } = initialState;
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setinitialState((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const submitHandle = (e) => {
    e.preventDefault();
    if (!name || !email || !location) {
      displayAlert();
      return;
    }
    const currentUser = initialState;
    updateUser(currentUser);
  };
  return (
    <>
      <div className="flex py-6">
        <h1 className="font-base text-3xl text-slate-700">Profile</h1>
      </div>
      {showAlert && <Alert />}
      <form onSubmit={submitHandle}>
        <div className="flex flex-wrap lg:space-x-3">
          <div className="flex w-full lg:w-auto flex-col space-y-3 items-start p-3">
            <label className="font-semibold" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={inputHandle}
              className="border border-slate-400 px-2 py-1 rounded-md w-full outline-none"
            />
          </div>
          <div className="flex w-full lg:w-auto flex-col space-y-3 items-start p-3">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={inputHandle}
              className="border border-slate-400 px-2 py-1 rounded-md w-full outline-none"
            />
          </div>
          <div className="flex w-full lg:w-auto flex-col space-y-3 items-start p-3">
            <label className="font-semibold" htmlFor="location">
              Location
            </label>
            <input
              name="location"
              type="text"
              value={location}
              onChange={inputHandle}
              className="border border-slate-400 px-2 py-1 rounded-md w-full outline-none"
            />
          </div>
        </div>
        <div className="flex py-8 justify-center items-center lg:w-[100vh]">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-[#48A5BA] py-1 px-16 rounded-md text-white hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default Profile;
