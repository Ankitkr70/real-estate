import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";
import Modal from "../components/Modal";
const Profile = () => {
  const fileRef = useRef(null);
  const currentUser = useSelector((store) => store.user.currentUser);
  const [file, setFile] = useState(undefined);
  const [uploadPercentage, setUploadPercenge] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

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
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-bold text-xl text-slate-700 text-center my-10">
        Profile
      </h1>
      <form className="flex flex-col gap-5 ">
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          ref={fileRef}
          onChange={handleFile}
          onClick={(e) => (e.target.value = "")}
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
          className="outline-none border rounded-md p-3 text-slate-700"
          placeholder="Username"
        />
        <input
          id="email"
          type="text"
          className="outline-none border rounded-md p-3 text-slate-700"
          placeholder="Email"
        />
        <input
          id="password"
          type="password"
          className="outline-none border rounded-md p-3 text-slate-700"
          placeholder="password"
        />
        <input
          type="submit"
          value={"UPDATE"}
          className="outline-none border rounded-md p-3 bg-slate-600 cursor-pointer hover:bg-slate-700 text-white"
        />
        <input
          type="submit"
          value={"CREATE LISTING"}
          className="outline-none border rounded-md p-3 bg-green-700 cursor-pointer hover:bg-green-800 text-white"
        />
        <div className="flex justify-between">
          <span className="text-red-700 text-sm font-bold">Delete Account</span>
          <span className="text-red-700 text-sm font-bold">Sign Out</span>
        </div>
      </form>
      {showModal && <Modal onClick={() => setShowModal(false)} />}
    </div>
  );
};

export default Profile;
