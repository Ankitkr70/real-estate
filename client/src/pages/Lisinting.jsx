const Lisinting = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-bold text-3xl text-center my-5">Create a lising</p>
      <form className="p-4 flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="p-2 rounded-md"
          />
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="3"
            placeholder="Description"
            className="p-2 rounded-md"
          ></textarea>
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="p-2 rounded-md"
          />
          <div className="flex gap-4 flex-wrap">
            <div>
              <input type="checkbox" id="sale" className="mr-2" />
              <span>Sell</span>
            </div>
            <div>
              <input type="checkbox" id="rent" className="mr-2" />
              <span>Rent</span>
            </div>
            <div>
              <input type="checkbox" id="parking" className="mr-2" />
              <span>Parking Spot</span>
            </div>
            <div>
              <input type="checkbox" id="furnished" className="mr-2" />
              <span>Furnished</span>
            </div>
            <div>
              <input type="checkbox" id="offer" className="mr-2" />
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
                defaultValue={1}
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
                defaultValue={1}
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
              defaultValue={0}
              className="mr-2 p-2 rounded-md w-16"
            />
            <span>Regular Price (per/month)</span>
          </div>
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
              type="file"
              accept="image/*"
              id="images"
              multiple
              className="border p-2 font-bold"
            />
            <button className="border px-4 bg-green-600 rounded-md text-white">
              Upload
            </button>
          </div>
          <button className="bg-slate-700 text-white py-4 rounded-md">
            CERATE LISTING
          </button>
        </div>
      </form>
    </div>
  );
};

export default Lisinting;
