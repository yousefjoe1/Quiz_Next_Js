"use client";

import React, { FC, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import postData from "@/app/Requests/postData";

interface FormValues {
  username: string;
  email: string;
  phone: string;
  password: string;
  c_password: string;
}

const Register: FC = () => {
  const form = useForm<FormValues>();

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const msg = useToast();

  const [isSubmit, setIsSubmit] = useState(false);

  const redirect = useRouter();

  const loginFunc = async (data: FormValues) => {
    const { username, email, phone, password, c_password } = data;
    setIsSubmit(true);

    const dataValues = {
      name: username,
      phone: phone,
      password: password,
      c_password: c_password,
      email: email,
      guard: "student",
    };

    let res = await postData("register", dataValues);

    if (res.state == "error") {
      setIsSubmit(false);
      msg({ title: res.message, status: "error", duration: 3000 });
    } else {
      redirect.push("/profile");
      setIsSubmit(false);
    }
  };

  return (
    <div className="register-wrapper">
      {/* <h3>Register Page</h3> */}
      <h1 className="mt-8 mb-3 center bg-slate-200 rounded-md bold p-5">
        Register
      </h1>

      <form
        // onInvalid
        noValidate
        className="bg-slate-50 grid lg:grid-cols-2 md:grid-cols-2 place-items-center rounded-2xl gap-5 p-3"
        onSubmit={handleSubmit(loginFunc)}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            {...register("username", { required: "user name required" })}
            type="text"
            className="p-2 bg-slate-500 outline-none border-none block rounded-lg"
          />
          <p>{errors.username?.message}</p>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
            type="email"
            className="p-2 bg-slate-500 outline-none border-none block rounded-lg"
          />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            {...register("phone", {
              pattern: {
                value: /^\d{11}$/, // Matches 10-digit phone numbers
                message: "Invalid phone number format",
              },
            })}
            type="phone"
            className="p-2 bg-slate-500 outline-none border-none block rounded-lg"
            placeholder="Ex: 01024090192"
          />
          <p>{errors.phone?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: "password required" })}
            type="password"
            className="p-2 bg-slate-500 outline-none border-none block rounded-lg"
          />
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("c_password", {
              required: "confirm password required",
            })}
            type="password"
            className="p-2 bg-slate-500 outline-none border-none block rounded-lg"
          />
          <p>{errors.c_password?.message}</p>
        </div>


        {isSubmit ? (
          <Spinner size={"2xl"} height={50} width={1} />
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
