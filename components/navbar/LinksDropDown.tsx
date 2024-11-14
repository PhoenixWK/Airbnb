
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {LuAlignLeft} from "react-icons/lu";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import UserIcon from "@/components/navbar/UserIcon";
import {links} from "@/utils/links"
import SignOutLink from "@/components/navbar/SignOutLink";
import {SignedIn, SignedOut, SignInButton, SignUpButton} from "@clerk/nextjs";

const LinksDropDown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-4">
                    <LuAlignLeft className="w-6 h-6"/>
                    <UserIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52" align="start" sideOffset={10}>
                <SignedOut>
                    <DropdownMenuItem>
                        <SignInButton mode="modal">
                            <button className="w-full text-left">Login</button>
                        </SignInButton>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <SignUpButton mode="modal">
                            <button className="w-full text-left">Sign up</button>
                        </SignUpButton>
                    </DropdownMenuItem>
                </SignedOut>
                <SignedIn>
                    {links.map((link) => (
                        <DropdownMenuItem key={link.href}>
                            <Link
                                href={link.href}
                                className="capitalize w-full"
                            >
                                {link.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <SignOutLink/>
                    </DropdownMenuItem>
                </SignedIn>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LinksDropDown
