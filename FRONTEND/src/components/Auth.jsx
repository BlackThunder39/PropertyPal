import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Auth(props) {
  const nav = useNavigate();
  const inputEl = useRef(null);
  const passEl = useRef(null);
  const [isName, setIsName] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (
      inputEl.current.value === "" ||
      userId.toUpperCase().charAt(0) === "A" ||
      userId.toUpperCase().charAt(0) === "O" ||
      userId.toUpperCase().charAt(0) === "E" ||
      userId.toUpperCase().charAt(0) === "T"
    ) {
      setIsName(true);
      return;
    } else {
      setIsName(false);
    }
  }, [userId]);

  useEffect(() => {
    if (password.length === 0) {
      setIsPassword(true);
      return;
    } else if (password.length < 6) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }, [password]);

  const authorize = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth", {
        username: userId,
        password: password,
      });
      if (res.data.access === "granted") {
        window.localStorage.setItem(
          "whom",
          JSON.stringify({
            userType: res.data.user,
            username: userId,
          })
        );
        if (res.data.user === "employee") {
          nav("/employee", { replace: true });
        }
        if (res.data.user === "admin") {
          nav("/admin", { replace: true });
        }
        if (res.data.user === "tenant") {
          nav("/tenant", { replace: true });
        }
        if (res.data.user === "owner") {
          nav("/owner", { replace: true });
        }
        if (res.data.user === "unknown") {
          setIsName(false);
        } else if (res.data.user === "passunknown") {
          setIsPassword(false);
        }
      } else {
        setIsName(false);
        setIsPassword(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = function (e) {
    e.preventDefault();
    setUserId(inputEl.current.value);
    setPassword(passEl.current.value);
    authorize();
  };

  return (
    <div className="bg-indigo-100">
      <div className="flex items-center min-h-screen z-50">
        <div className="container mx-auto flex">
          
          {/* PropertyPal Description Panel */}
          <div className="flex-1 p-5">
            <div className="my-10 text-left">
              <h1 className="text-7xl font-bold text-gray-800">
                PropertyPal
              </h1>
              <p className="mt-4 text-4xl text-gray-700">
                Easy Property Management <br />
              </p>
              <br />
              <p className="text-2xl text-gray-600">
              DBS Project by: <br/>  Arpit Jha (A2-41)<br/> Venkatesh (A2-36)
              </p>
            </div>
          </div>

          {/* Authentication Box */}
          <div className="flex-1 max-w-xl mx-auto my-10 bg-gray-800 p-8 rounded-md">
            <div className="text-center">
              <h1 className="my-3 text-4xl font-semibold text-zinc-50">
                Welcome Back ! 
              </h1>
            </div>
            <div className="m-7">
              <form onSubmit={submitHandler}>
                <div className="relative mb-3">
                  <label htmlFor="user-id" className="block mb-2 text-sm text-gray-50">
                    User Id
                  </label>
                  <input
                    ref={inputEl}
                    type="text"
                    autoFocus
                    name="user-id"
                    required
                    value={userId}
                    onChange={() => setUserId(inputEl.current.value)}
                    id="user-id"  // Ensuring proper id
                    placeholder="User id"
                    className={`w-full px-3 py-3 placeholder-gray-300 border ${isName ? "border-gray-300" : "border-red-500"} rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300`}
                  />
                  {!isName && (
                    <span className="absolute right-2 top-12 font-semibold text-sm mt-2 block text-red-500">
                      Invalid username
                    </span>
                  )}
                </div>
                <div className="relative mb-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-50">
                      Password
                    </label>
                  </div>
                  <input
                    ref={passEl}
                    type="password"
                    required
                    name="password"
                    id="password"
                    value={password}
                    autoComplete="on"
                    onChange={() => setPassword(passEl.current.value)}
                    placeholder="Your Password"
                    className={`w-full px-3 py-3 placeholder-gray-300 border ${isPassword ? "border-gray-300" : "border-red-500"} rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300`}
                  />
                  {!isPassword && (
                    <span className="absolute right-2 top-12 font-semibold text-sm mt-2 block text-red-500">
                      Invalid password
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <button type="submit" className="w-full px-4 py-4 font-semibold bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none hover:bg-white hover:text-blue-500 transition-all duration-300 hover:border-blue-500 border-transparent border-2">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
);

}

export default Auth;
