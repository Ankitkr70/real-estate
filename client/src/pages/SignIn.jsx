import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validate";
import { useState } from "react";
import { requestOptions } from "../utils/helper";
import { GoEye, GoEyeClosed } from "react-icons/go";

import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import GoogleAuth from "../components/GoogleAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { loading, serverError } = useSelector((store) => store?.user) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateFormData = (formData) => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    if (emailError || passwordError) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData(formData)) return;

    dispatch(signInStart());
    try {
      const options = requestOptions("POST", formData);
      const res = await fetch("/api/auth/signin", options);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      setFormData({});
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  const handleEye = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-slate-600 font-bold text-xl text-center my-5">
        Sign In
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          id="email"
          type="text"
          placeholder="Email"
          className="outline-none border rounded-md p-3 text-slate-700"
          onChange={handleChange}
        />
        <div className="flex items-center relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="outline-none border rounded-md p-3 text-slate-700 w-full flex-grow pr-10"
            onChange={handleChange}
          />
          <span
            className="absolute right-5 text-slate-700 cursor-pointer"
            onClick={handleEye}
          >
            {showPassword ? <GoEye /> : <GoEyeClosed />}
          </span>
        </div>
        <input
          disabled={loading}
          type="submit"
          value={"Sign In"}
          className="outline-none border rounded-md p-3 bg-slate-600 cursor-pointer hover:bg-slate-700 text-white"
        />
        <GoogleAuth />
      </form>
      <div className="text-[12px] font-bold my-5 text-slate-700">
        <span className="mr-2">Don't have an account?</span>
        <Link to="/sign-up">
          <span className="text-blue-700 cursor-pointer">Sign Up</span>
        </Link>
      </div>
      {serverError && <div className="text-red-500">{serverError}</div>}
    </div>
  );
};

export default SignIn;
