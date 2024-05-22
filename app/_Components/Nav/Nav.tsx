import React from "react";
import Cart from "../Cart/Cart";
import { isAuth } from "@/app/Requests/isAuth";
const Nav = async () => {

  const {isTrue} = await isAuth();



  return (
    <nav className="nav bg-slate-400 p-4 flex justify-between">
      <h3 className="lg:text-3xl text-lg bold text-slate-800 ">Quiz</h3>

      {/* if getinfo false hide cart */}
      {isTrue == true ? <Cart /> : "cart unavailable"}
    </nav>
  );
};

export default Nav;
