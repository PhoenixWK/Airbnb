'use client'


import { useToast } from "@/hooks/use-toast";
import React from "react";
import { actionFunction } from '@/utils/types'

const initialState = {
    message: ""
}

export default function FormContainer({
    action,
    children
}: {action: actionFunction, children: React.ReactNode}) {
    const [state, formAction] = React.useActionState(action, initialState);
    const {toast} = useToast();

    React.useEffect(() => {
        if(state.message) {
            toast({
                description: state.message,
            })
        }
    }, [state])
    return (
        <form action={formAction}>
            {children}
        </form>
    )
}