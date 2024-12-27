import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import EmojiInput from "../utils/emoji-input";
import RedirectText from "../utils/redirect-text";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@gitgud/types";
import { register, actions as auth } from "@/store/auth";
import Wrapper from "../pages/wrapper";
import "./login.css";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({});
  const { loading, user } = useSelector((state: Store.AppState) => state.auth);
  const dispatch = useDispatch();
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(register(data));
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
            <EmojiInput
              type="text"
              label="person-outline"
              className="bg-inherit w-full outline-none"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
            <EmojiInput
              type="text"
              label="call-outline"
              className="bg-inherit w-full outline-none"
              placeholder="Phone number"
              id="phone"
              onChange={handleChange}
            />
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
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="text-sm w-full mt-2 text-[#94a3b8]">
            Already have an account?{" "}
            <RedirectText color="#0d6efd" to={"/login"}>
              Login
            </RedirectText>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
