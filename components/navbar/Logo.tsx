
import React from 'react'
import Link from 'next/link'
import {Button} from "@/components/ui/button";
import { TbBrandAirbnb } from "react-icons/tb";

const Logo = () => {
    return (
        <Button size="icon" asChild={true}>
            <Link href="/">
                <TbBrandAirbnb className="w-6 h-6" />
            </Link>
        </Button>
    )
}

export default Logo
