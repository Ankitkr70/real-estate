import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa6";
const ListingItem = ({ listing }) => {
  return (
    <div className="py-8 cursor-pointer">
      <div className="w-[250px] md:w-[300px] overflow-hidden rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <img
          src={listing.imageUrls[0]}
          alt="listing Image"
          className="h-[175px] object-cover w-full rounded-md hover:scale-105 transition-scale duration-300"
        />
        <div className="p-4 text-sm flex flex-col gap-4 text-slate-700 ">
          <p className="truncate font-semibold text-xl">{listing.name}</p>
          <p className="flex gap-2 items-center truncate">
            <FaLocationDot className="text-green-700" /> {listing.address}
          </p>
          <p>
            {listing.description.length > 100
              ? listing.description.slice(0, 100) + "..."
              : listing.description}
          </p>
          <span className="font-bold">
            ₹ {listing.offer ? listing.discountPrice : listing.regularPrice}{" "}
            /month
          </span>
          <p className="flex gap-2 font-bold">
            <span className="flex gap-2 items-center">
              <FaBed /> {listing.bedrooms} bed
            </span>
            <span className="flex gap-2 items-center">
              <FaBath />
              {listing.bathrooms} bath
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingItem;
