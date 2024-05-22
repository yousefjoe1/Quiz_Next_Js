"use client";

import React, { FC, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import postData from "@/app/Requests/postData";

const Register: FC = () => {
  const msg = useToast();

  const [isSubmit, setIsSubmit] = useState(false);

  const phone = useRef<string>(""),
    name = useRef<string>(""),
    password = useRef<string>(""),
    c_pass = useRef<string>(""),
    mail = useRef<string>("");

  const redirect = useRouter();

  const loginFunc = async (e: { preventDefault: () => void }) => {
    setIsSubmit(true);
    e.preventDefault();
    if (phone.current && password.current) {
      const data = {
        name: name.current,
        phone: phone.current,
        password: password.current,
        c_password: c_pass.current,
        email: mail.current,
        guard: "student",
      };

      let res = await postData("register", data);

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
      {/* <h3>Register Page</h3> */}
      <h1 className="mt-8 mb-3 center bg-slate-200 rounded-md bold p-5">Register</h1>


      <form
        className="bg-slate-50 grid lg:grid-cols-2 md:grid-cols-2 place-items-center rounded-2xl gap-5 p-3"
        onSubmit={loginFunc}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="username"
            onChange={(e) => (name.current = e.target.value)}
            type="text"
            className="p-2 bg-slate-500 outline-none border-none block rounded-lg"
          />
        </div>

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

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            name="confirmPassword"
            onChange={(e) => (c_pass.current = e.target.value)}
            type="text"
            className="p-2 bg-slate-500 outline-none border-none block rounded-lg"
          />
        </div>
        {isSubmit ? (
          "Sending .........."
        ) : (
          <button
            className="p-2 bg-slate-500 hover:text-white outline-none border-none block rounded-lg"
            type="submit"
          >
            Register
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
