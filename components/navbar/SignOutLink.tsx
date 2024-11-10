'use client'

import React from 'react'
import { SignOutButton } from '@clerk/nextjs'
import {useToast} from "@/hooks/use-toast";

const SignOutLink = () => {
    const {toast} = useToast();
    const handleSignOut = () => {
        toast({
            description: 'You have been signed out',
        })
    }
    return (
        <SignOutButton redirectUrl="/" >
            <button onClick={handleSignOut} className="w-full text-left">
                Logout
            </button>
        </SignOutButton>
    )
}

export default SignOutLink
