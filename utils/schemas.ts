import * as z from 'zod'
import {ZodSchema} from "zod";



export const profileSchema = z.object({
    firstName: z.string().min(2, {
        message: 'First name must be at least 2 characters'
    }),
    lastName: z.string().min(2, {
        message: 'Last name must be at least 2 characters'
    }),
    userName: z.string().min(2, {
        message: 'User name must be at least 2 characters'
    })
})

export function validateWithZodSchema<T>(
    schema: ZodSchema<T>,
    data: unknown
): T {
    //Validation(returns an object containing either the successfully parsed data or
    // a ZodError instance containing detailed information about the validation problems.)
    const result = schema.safeParse(data);

    //throw error if user do not accpept the web demand
    if (!result.success) {
        const errors = result.error.errors.map((error) => error.message);
        throw new Error(errors.join(', '));
    }
    return result.data;
}