import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";
import Modal from "../components/Modal";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  signOutFailure,
  signOutStart,
} from "../redux/user/userSlice";
import { requestOptions } from "../utils/helper";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, serverError } =
    useSelector((store) => store.user) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(undefined);
  const [uploadPercentage, setUploadPercenge] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showUserListing, setShowUserListing] = useState(false);
  const [userListing, setUserListing] = useState([]);
  useEffect(() => {
    if (file) {
      uploadImage(file);
    }
  }, [file]);

  const handleFile = (e) => {
    if (e.target.files[0].size > 2 * 1024 * 1024) {
      setShowModal(true);
      return;
    }
    setFile(e.target.files[0]);
  };

  const uploadImage = (file) => {
    const storage = getStorage(app);
    const fileName = file.name + Math.round(new Date().getTime());
    const storageRef = ref(storage, `user_profile/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercenge(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prevData) => ({ ...prevData, photo: downloadURL }))
        );
      }
    );
  };

  const ShowUploadProgress = () => {
    return (
      <span className=" self-center text-sm font-bold text-green-600">
        {uploadPercentage}% file update is in progress...
      </span>
    );
  };

  const ShowFileUploadError = () => {
    return (
      <span className=" self-center text-sm font-bold text-red-700">
        Error while uploading the file, keep the file size below 2 MB.
      </span>
    );
  };

  const ShowUploadInfo = () => {
    if (fileUploadError) return <ShowFileUploadError />;
    if (uploadPercentage > 0 && uploadPercentage < 100)
      return <ShowUploadProgress />;
    if (uploadPercentage === 100)
      return (
        <span className=" self-center text-sm font-bold text-green-600">
          Image uploaded Successfully
        </span>
      );
    return <></>;
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setUpdateSuccess(false);
      dispatch(updateUserStart());
      const options = requestOptions("POST", formData);
      const res = await fetch(`/api/user/update/${currentUser._id}`, options);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      setUpdateSuccess(true);
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "Delete",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleUserListing = async () => {
    setShowUserListing(!showUserListing);
    setError("");

    if (!userListing.length) {
      try {
        const res = await fetch(
          `/api/listing/user-listings/${currentUser._id}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
        setUserListing(data);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "Delete",
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      const filterData = userListing.filter((property) => property._id !== id);
      setUserListing(filterData);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-bold text-xl text-slate-700 text-center my-10">
        Profile
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleForm}>
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          ref={fileRef}
          onChange={handleFile}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.photo || currentUser.photo}
          alt="User profile image"
          className=" cursor-pointer object-cover w-[100px] h-[100px] rounded-full self-center"
        />
        <ShowUploadInfo />
        <input
          id="username"
          type="text"
          defaultValue={currentUser.username}
          className="outline-none border rounded-md p-3 text-slate-700"
          placeholder="Username"
          onChange={handleOnChange}
        />
        <input
          id="email"
          type="text"
          defaultValue={currentUser.email}
          className="outline-none border rounded-md p-3 text-slate-700"
          placeholder="Email"
          onChange={handleOnChange}
        />
        <input
          id="password"
          type="password"
          defaultValue={currentUser.password}
          className="outline-none border rounded-md p-3 text-slate-700"
          placeholder="password"
          onChange={handleOnChange}
        />
        <input
          type="submit"
          disabled={loading}
          value={"UPDATE"}
          className="outline-none border rounded-md p-3 bg-slate-600 cursor-pointer hover:bg-slate-700 text-white"
        />
        <input
          type="button"
          value={"CREATE LISTING"}
          onClick={() => navigate("/create-listing")}
          className="outline-none border rounded-md p-3 bg-green-700 cursor-pointer hover:bg-green-800 text-white"
        />
        <div className="flex justify-between">
          <span
            className="text-red-700 text-sm font-bold cursor-pointer"
            onClick={handleDelete}
          >
            Delete Account
          </span>
          <span
            className="text-red-700 text-sm font-bold cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </span>
        </div>
      </form>
      <p className="text-center my-5 font-bold text-red-700">
        <code>{serverError ? serverError : ""}</code>
      </p>
      <p className="text-center my-5 font-bold text-red-700">
        <code>{error ? error : ""}</code>
      </p>
      <p className="text-center my-5 font-bold text-green-700">
        <code>{updateSuccess ? "User has been updated successfully" : ""}</code>
      </p>
      <div className="text-center">
        <button
          onClick={handleUserListing}
          className="etxt-center outline-none border rounded-md p-3 bg-green-700 cursor-pointer hover:bg-green-800 text-white"
        >
          Showing Listing
        </button>
      </div>
      {showUserListing &&
        userListing.length > 0 &&
        userListing.map((property) => {
          return (
            <div
              key={property._id}
              className="flex justify-between p-4 border my-4"
            >
              <img
                src={property.imageUrls[0]}
                alt="property image"
                className="w-[150px] h-[100px] object-cover rounded-md"
              />
              <p className="flex flex-col cursor-pointer">
                <code
                  className="text-red-600 font-bold"
                  onClick={() => handleDeleteListing(property._id)}
                >
                  Delete
                </code>
                <code className="text-green-600 font-bold">Edit</code>
              </p>
            </div>
          );
        })}

      {showModal && (
        <Modal
          message={
            " Only Images are allowed. File size should be less than 2 MB."
          }
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Profile;
