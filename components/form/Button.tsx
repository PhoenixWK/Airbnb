'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button'

type SubmitButtonProps = {
    clasName?: string,
    text?: string
}

export function SubmitButton({ clasName='', text='submit' }: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className={`capitalize ${clasName}`}
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