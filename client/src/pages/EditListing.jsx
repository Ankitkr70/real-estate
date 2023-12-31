import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import app from "../firebase";
import Modal from "../components/Modal";
import { requestOptions } from "../utils/helper";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditListing = () => {
  const currentUser = useSelector((store) => store.user.currentUser);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get-listing/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setShowModal(true);
          return;
        }
        setFormData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchListing();
  }, []);

  const handleImageUpload = () => {
    // fileRef.current.value = "";
    setUploading(true);
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      const promises = [...files].map((file) => {
        return uploadImage(file);
      });
      Promise.all(promises)
        .then((urls) => {
          setUploading(false);
          setError("");
          setFormData({
            ...formData,
            imageUrls: [...formData.imageUrls, ...urls],
          });
        })
        .catch((error) => {
          setUploading(false);
          setError("Error while uploading images please try again");
          setShowModal(true);
        });
    } else {
      setUploading(false);
      setError("You can upload only 6 files at max");
      setShowModal(true);
    }
  };

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = file.name + Math.round(new Date().getTime());
      const storageRef = ref(storage, `user_profile/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress + "%");
        },
        (error) => {
          reject(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch(() => {
              reject(error.message);
            });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => index !== i),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1) {
      setError("You must upload atleast 1 image");
      setShowModal(true);
      return;
    }
    if (formData.regularPrice < formData.discountPrice) {
      setError("Discounted price cannot be more than property price");
      setShowModal(true);
      return;
    }

    try {
      setLoading(true);
      const options = requestOptions("POST", {
        ...formData,
        userRef: currentUser._id,
      });
      const res = await fetch(
        `/api/listing/update/${params.listingId}`,
        options
      );
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setShowModal(true);
        setLoading(false);
      }
      setLoading(false);
      setError("");
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setShowModal(true);
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-bold text-3xl text-center my-5">Edit lising</p>
      <form
        className="p-4 flex flex-col sm:flex-row gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="p-2 rounded-md"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="3"
            placeholder="Description"
            className="p-2 rounded-md"
            required
            onChange={handleChange}
            value={formData.description}
          ></textarea>
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="p-2 rounded-md"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-4 flex-wrap">
            <div>
              <input
                type="checkbox"
                id="sale"
                className="mr-2"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="rent"
                className="mr-2"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="parking"
                className="mr-2"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="furnished"
                className="mr-2"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="offer"
                className="mr-2"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className="mr-2 p-2 rounded-md w-16"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <span>Beds</span>
            </div>
            <div>
              <input
                type="number"
                id="bathrooms"
                min={1}
                max={10}
                required
                onChange={handleChange}
                value={formData.bathrooms}
                className="mr-2 p-2 rounded-md w-16"
              />
              <span>Baths</span>
            </div>
          </div>
          <div>
            <input
              type="number"
              id="regularPrice"
              required
              onChange={handleChange}
              value={formData.regularPrice}
              className="mr-2 p-2 rounded-md w-16"
            />
            <span>Regular Price (per/month)</span>
          </div>
          {formData.offer && (
            <div>
              <input
                type="number"
                id="discountPrice"
                required
                onChange={handleChange}
                value={formData.discountPrice}
                className="mr-2 p-2 rounded-md w-16"
              />
              <span>Discount Price (per/month)</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p>
            <code>
              <span className="font-bold">Images: </span> The first image will
              be cover (max 6)
            </code>
          </p>
          <div className="flex gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              id="images"
              multiple
              className="border p-2 font-bold"
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              disabled={uploading}
              onClick={handleImageUpload}
              type="button"
              className="border px-4 bg-green-600 rounded-md text-white"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <div>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-4"
                  >
                    <img
                      src={url}
                      alt="listing image"
                      className="w-[100px] h-[75px] object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="text-red-700 font-bold"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <code>Remove</code>
                    </button>
                  </div>
                );
              })}
          </div>
          <button
            disabled={loading || uploading}
            className="bg-slate-700 text-white py-4 rounded-md"
          >
            {loading ? "Updating" : "Update LISTING"}
          </button>
        </div>
      </form>
      {showModal && (
        <Modal message={error} onClick={() => setShowModal(false)}></Modal>
      )}
    </div>
  );
};

export default EditListing;
