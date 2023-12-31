import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa6";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
const ShowListing = () => {
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [linkCopy, setLinkCopy] = useState(false);
  console.log(listing);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get-listing/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
        }
        setListing(data);
        setLoading(false);
        setError("");
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchListing();
  }, []);

  if (loading) {
    return (
      <div>
        {loading && (
          <p className="text-lg font-bold text-center p-10">Loading...</p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {error && <p className="text-lg font-bold text-center p-10">{error}</p>}
      </div>
    );
  }

  const handleShare = async () => {
    setLinkCopy(true);
    await navigator.clipboard.writeText(window.location.href);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div
        onClick={handleShare}
        className="cursor-pointer absolute z-10 top-28 right-10 bg-slate-300 p-5 rounded-full text-xl font-bold"
      >
        <FaRegShareSquare />
      </div>
      <p className="absolute z-10 top-44 right-6 text-slate-700 font-bold">
        <code> {linkCopy ? "Link Copied" : ""} </code>
      </p>
      <Slider {...settings} className="">
        {listing.imageUrls.map((image, index) => {
          return (
            <div className="" key={index}>
              <img
                src={image}
                alt="property image"
                className="h-[400px] sm:h-[60vh] w-full object-cover"
              />
            </div>
          );
        })}
      </Slider>
      <main className="p-2 max-w-4xl mx-auto text-slate-900 font-semibold">
        <p className="text-xl font-bold py-4">{listing.name}</p>
        <p className="flex gap-2 items-center">
          <FaLocationDot className="text-green-700" />
          {listing.address}
        </p>
        <div className="my-4">
          <span className="bg-red-900 px-20 text-white rounded-md py-2 mr-8">
            {listing.type}
          </span>
          <span className="bg-green-900 px-20 text-white rounded-md py-2 mr-8">
            ₹ {listing.regularPrice}
          </span>
        </div>
        <p className="my-4">
          <span className="font-bold">Description: </span>
          {listing.description}
        </p>
        <div className="flex gap-4 text-md text-white flex-wrap">
          <div className="bg-slate-600 px-4 py-2 gap-2 rounded-md flex items-center">
            <FaBed />
            <span>
              {listing.bedrooms} {listing.bedrooms > 1 ? "Beds" : "Bed"}
            </span>
          </div>
          <div className="bg-slate-600 px-4 py-2 gap-2 rounded-md flex items-center">
            <FaBath />
            <span>
              {listing.bathrooms}{" "}
              {listing.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
            </span>
          </div>
          <div className="bg-slate-600 px-4 py-2 gap-2 rounded-md flex items-center">
            <FaParking />
            <span>{listing.parking ? "Parking" : "No Parking"}</span>
          </div>
          <div className="bg-slate-600 px-4 py-2 gap-2 rounded-md flex items-center">
            <FaChair />
            <span>{listing.furnished ? "Furnished" : "Not Furnished"}</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default ShowListing;
