const SignUp = () => {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-slate-600 font-bold text-xl text-center my-5">
        Sign up
      </h1>
      <form className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="User name"
          className="outline-none border rounded-md p-3  text-slate-700"
        />
        <input
          type="text"
          placeholder="Email"
          className="outline-none border rounded-md p-3 text-slate-700"
        />
        <input
          type="text"
          placeholder="Password"
          className="outline-none border rounded-md p-3 text-slate-700"
        />
        <input
          type="submit"
          value={"Sign In"}
          className="outline-none border rounded-md p-3 bg-slate-600 cursor-pointer hover:bg-slate-700 bg-transparent text-white"
        />
      </form>
      <div className="text-[12px] font-bold my-5 text-slate-700">
        <span className="mr-2">Have an account?</span>
        <span className="text-blue-700 cursor-pointer">Sign In</span>
      </div>
    </div>
  );
};

export default SignUp;
