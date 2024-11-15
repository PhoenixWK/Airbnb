'use server'

import {profileSchema} from "@/utils/schemas";

export const createProfileAction = async (
    prevState: any,
    formData: FormData
) => {
   try {
       const rawData = Object.fromEntries(formData);
       const validateFields = profileSchema.parse(rawData);
       console.log(validateFields);
       return {message: "Profile created successfully"}
   }catch(e) {
      console.log(e);
      return {message: 'There was an error'}
   }
}