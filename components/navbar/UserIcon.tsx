
import React from 'react'
import Image from 'next/image'
import {LuUser2} from "react-icons/lu";
import {fetchImageProfile} from "@/utils/actions";

const UserIcon = async () => {
    const profile = await fetchImageProfile();
    if(profile) {
        return (
            <Image
                src={profile}
                alt="user"
                width={24}
                height={24}
                className=" object-cover rounded-full"
            />
        )
    }
    return (
        <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white"/>
    )
}

export default UserIcon
