import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../firebase";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { requestOptions } from "../utils/helper";
import { useNavigate } from "react-router-dom";
const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const hangleGoogleSigin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const body = {
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      const options = requestOptions("POST", body);
      const res = await fetch("/api/auth/google", options);
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <button
      className="rounded-md p-3 bg-red-700  hover:bg-red-800 text-white flex items-center justify-center"
      onClick={hangleGoogleSigin}
    >
      <FaGoogle className="text-md mr-2" /> Sign in with Google
    </button>
  );
};

export default GoogleAuth;
