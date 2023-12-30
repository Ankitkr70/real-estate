const Modal = ({ onClick, message }) => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
      <div className="bg-white p-5 w-[75%] sm:w-[50%] rounded-md text-center">
        <p className="text-red-800 font-bold">
          <code>{message}</code>
        </p>

        <button
          className="bg-green-700 text-white py-2 px-4 mt-4 rounded-md"
          onClick={onClick}
        >
          <code>Cancel</code>
        </button>
      </div>
    </div>
  );
};

export default Modal;
