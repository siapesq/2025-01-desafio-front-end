"use client"


import { SessionProvider } from "next-auth/react";
import SignIn from "./sign-in/page";


const  Home = () =>  {


  return (



    <SessionProvider>
      <SignIn/>
    </SessionProvider>


  );
}

export default Home;