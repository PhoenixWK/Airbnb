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
        throw new Error(errors.join(', ')); //return array as a string with adding separator
    }
    return result.data;
}

export const imageSchema = z.object({
    image: validateFile(),
});

function validateFile() {
    //1 kb = 1024 byte, 1 mb = 1024 kb --> 1 mb = 1024 * 1024 byte
    const maxUploadSize = 1024 * 1024;
    //The 'image/' string is a prefix used in MIME types for image files
    //MIME (Multipurpose Internet Mail Extensions)
    const acceptedFileTypes = ['image/'];
    return z
        .instanceof(File) //check if the input is instance of File
        //.refine is used to define custom validation
        .refine((file) => {
            //check if the input is not an instance of file, if input is instance of File then check the size of file
            return !file || file.size <= maxUploadSize;
        }, `File size must be less than 1 MB`)
        .refine((file) => {
            return (
                //some() method is used to check at least one element in array passes the text provided by the function
                //it returns true if one element in arr passes or returns false if arr does not have element passes
                //this method does not modify the arr
                !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
            );
        }, 'File must be an image');
}