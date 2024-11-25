'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button'

type btnSize = 'default' | 'sm' | 'icon' | 'lg' | null | undefined;

type SubmitButtonProps = {
    className?: string,
    text?: string,
    size?: btnSize
}

export function SubmitButton({
    className = '',
    text = 'Submit',
    size = 'lg' //this is a default value
}: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            size={size}
            className={`capitalize ${className}`}
            disabled={pending}
        >
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Please wait...
                </>
            ): text}
        </Button>
    )
}