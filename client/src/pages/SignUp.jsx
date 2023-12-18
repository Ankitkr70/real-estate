import { useNavigate } from "react-router-dom";
import {
  validateUserName,
  validateEmail,
  validatePassword,
} from "../utils/validate";
import { useState } from "react";
import { requestOptions } from "../utils/helper";
import { Link } from "react-router-dom";
import { GoEye, GoEyeClosed } from "react-icons/go";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateFormData = (formData) => {
    const usernameError = validateUserName(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    if (usernameError || emailError || passwordError) {
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

    setLoading(true);
    try {
      const options = requestOptions("POST", formData);
      const res = await fetch("/api/auth/signup", options);
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError({
          ...error,
          serverError: data.message,
        });
        return;
      }
      setLoading(false);
      setError({});
      setFormData({});
      navigate("/sign-in");
    } catch (err) {
      setLoading(false);
      setError({
        ...error,
        serverError: err.message,
      });
    }
  };

  const handleEye = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-slate-600 font-bold text-xl text-center my-5">
        Sign up
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          placeholder="User name"
          className="outline-none border rounded-md p-3  text-slate-700"
          onChange={handleChange}
        />
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
      </form>
      <div className="text-[12px] font-bold my-5 text-slate-700">
        <span className="mr-2">Have an account?</span>
        <Link to="/sign-in">
          <span className="text-blue-700 cursor-pointer">Sign In</span>
        </Link>
      </div>
      {error.serverError && (
        <div className="text-red-500">{error.serverError}</div>
      )}
    </div>
  );
};

export default SignUp;
