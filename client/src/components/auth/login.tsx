import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import RedirectText from "../utils/redirect-text";
import EmojiInput from "../utils/emoji-input";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@gitgud/types";
import Wrapper from "../pages/wrapper";
import { login, actions as auth } from "@/store/auth";
// import { Navigate } from "react-router-dom";
import Navigate from "../utils/reload-ws-navigate";
import "./login.css";

const Login = () => {
  const [data, setData] = useState({});
  const { loading, user } = useSelector((state: Store.AppState) => state.auth);
  const dispatch = useDispatch();
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(login(data));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setData({ ...data, [event.target.id]: event.target.value });
  }

  useEffect(() => {
    dispatch(auth.attemptFailed());
  });

  return user ? (
    <Navigate to={"/"} />
  ) : (
    <Wrapper>
      <div className="flex justify-center items-center h-full w-full text-white bg-[#242424]">
        <div className=" bg-zinc-700 p-7 flex items-center flex-col rounded-lg w-[416px] container">
          <div className=" font-bold mt-1 text-2xl">Welcome back!</div>
          <div className="mt-2">We're so excited to see you again!</div>
          <form onSubmit={handleSubmit} className="flex flex-col w-full mt-1">
            <EmojiInput
              required
              type="email"
              className=" bg-inherit w-full outline-none"
              placeholder="Email"
              id="email"
              label="mail-outline"
              onChange={handleChange}
            />
            <EmojiInput
              required
              label="lock-closed-outline"
              type="password"
              className="bg-inherit w-full outline-none"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              toggle={["eye-outline", "eye-off-outline"]}
            />
            {/* <div className='mt-1 text-sm'><span className='text-[#0d6efd] hover:border-b-[#0d6efd] hover:border-b-[1px] border-solid hover:cursor-pointer' >Forgot your password?</span></div> */}
            <div className="mt-1 text-sm">
              <RedirectText color="#0d6efd" to="/forgot-password">
                Forgot your password?
              </RedirectText>
            </div>
            <button
              type="submit"
              className="mt-4 
          text-[--white-500] 
          bg-[--brand-500] hover:bg-[--brand-560]
          h-[44px] 
          rounded-[3px]
          font-medium"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <div className="text-sm w-full mt-2 text-[#94a3b8]">
            Need an account?{" "}
            <RedirectText color="#0d6efd" to={"/register"}>
              Register
            </RedirectText>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
