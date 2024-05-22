import { isAuth } from "./Requests/isAuth";
import { redirect } from "next/navigation";

import ChakraUi from "@/Providers/ChakraUI";
import Login from "./_Components/Auth/Login";
import Register from "./_Components/Auth/Register";

export default async function Home() {

  const {isTrue} = await isAuth();

  // if(isTrue){
  //   redirect('/profile')
  // }

  return (
    <main className="min-h-screen bg-slate-500 px-3 py-6">
      <ChakraUi>
        <Register />
        <Login />
      </ChakraUi>
    </main>
  );
}
