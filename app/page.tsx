import React from 'react'
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

const page = async () => {
  //check if user does not have its profile, then it will be directed to /profile/create
  const user = await currentUser();
  if(!user?.privateMetadata?.hasProfile) return redirect('/profile/create');
  return (
    <div className='container'>
      Home page
    </div>
  )
}

export default page
