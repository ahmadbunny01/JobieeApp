import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import Alert from "../components/Alert";
import Loading from "../components/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [initialState, setinitialState] = useState({
    email: "",
    password: "",
    showAlert: false,
  });
  const { email, password } = initialState;
  const emailRef = useRef();
  const passwordRef = useRef();
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setinitialState((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const { isLoading, showAlert, user, loginUser } = useAppContext();
  const submitHandle = (e) => {
    e.preventDefault();
    emailRef.current.value = "";
    passwordRef.current.value = "";
    const currentUser = { email, password };
    loginUser(currentUser);
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return isLoading ? (
    <>
      <div className="flex min-h-screen min-w-screen items-center justify-center">
        <Loading />
      </div>
    </>
  ) : (
    <>
      <div className="flex min-w-screen min-h-screen items-center">
        <div className="container mx-auto">
          <div className="flex mx-3 lg:mx-12 lg:justify-center items-center pt-12">
            <div className="w-full md:w-1/2 lg:w-2/6 border-t-8 rounded-md border-[#48a5ba] shadow-xl">
              <form onSubmit={submitHandle}>
                <div className="flex flex-col">
                  <div className="flex pt-8 justify-center items-center">
                    <h1 className="font-bold text-3xl text-[#48A5BA]">
                      Jobiee
                    </h1>
                  </div>
                  <div className="flex pt-2 justify-center items-center">
                    <h1 className="font-semibold text-xl text-black">
                      Sign In
                    </h1>
                  </div>
                  <div className="flex pt-2 px-8 justify-center items-center">
                    {showAlert && <Alert />}
                  </div>
                  <div className="flex pt-6 px-8 space-y-3 flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="border border-gray-400 p-1 rounded-md"
                      onChange={inputHandle}
                      ref={emailRef}
                    />
                  </div>
                  <div className="flex pt-6 px-8 space-y-3 flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className="border border-gray-400 p-1 rounded-md"
                      onChange={inputHandle}
                      ref={passwordRef}
                    />
                  </div>
                  <div className="flex py-8 px-3 w-full justify-center">
                    <button type="submit" className="main-btn w-1/2">
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex py-8 px-3 w-full justify-center">
                <p>
                  Don't Have An Account ?{" "}
                  <Link to="/register" className="font-semibold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
