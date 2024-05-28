"use client";
import postData from "@/app/Requests/postData";
import { Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const Login = () => {
  const phone = useRef<string>(""),
    password = useRef<string>(""),
    mail = useRef<string>("");

  const msg = useToast();
  const [isSubmit, setIsSubmit] = useState(false);
  const redirect = useRouter();

  const loginFunc = async (e: { preventDefault: () => void }) => {
    setIsSubmit(true);
    e.preventDefault();
    if (phone.current && password.current) {
      const data = {
        phone: phone.current,
        password: password.current,
        email: mail.current,
        guard: "student",
      };

      let res = await postData("login", data);

      if (res.state == "error") {
        setIsSubmit(false);
        msg({ title: res.message, status: "error", duration: 3000 });
      } else {
        redirect.push("/profile");
        // setIsSubmit(false);
      }
      console.log(res);
    } else {
      setIsSubmit(false);
      // Handle case when phone or password is undefined
    }
  };

  return (
    <div>
        <h1 className="mt-8 mb-3 center bg-slate-200 rounded-md bold p-5">Login</h1>
      <form
        className="bg-slate-50 grid lg:grid-cols-2 md:grid-cols-2 place-items-center rounded-2xl gap-5 p-3"
        onSubmit={loginFunc}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="useremail"
            onChange={(e) => (mail.current = e.target.value)}
            type="email"
            className="p-2 bg-slate-500 outline-none border-none block rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            onChange={(e) => (phone.current = e.target.value)}
            type="phone"
            className="p-2 bg-slate-500 outline-none border-none block rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            onChange={(e) => (password.current = e.target.value)}
            type="password"
            className="p-2 bg-slate-500 outline-none border-none block rounded-lg"
          />
        </div>

        {isSubmit ? (
          <Spinner size={"2xl"} height={50} width={1} />
          
        ) : (
          <button
            className="p-2 bg-slate-500 hover:text-white outline-none border-none block rounded-lg"
            type="submit"
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
