'use server'

import {profileSchema} from "@/utils/schemas";
import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const getAuthUser = async () => {
    const user = await currentUser();
    if(!user) {
        throw new Error('You must be logged in to access this page');
    };
    if(!user.privateMetadata.hasProfile) redirect('/profile/create');
    return user;
}

const renderError = (error: unknown): {message: string} => {
    console.error(error);
    return {
        message: error instanceof Error ? error.message : "An error occured"
    }
}

export const createProfileAction = async (
    prevState: any,
    formData: FormData
) => {
   try {
       const user = await currentUser();
       if(!user) throw new Error('Please login to create a profile');

       const rawData = Object.fromEntries(formData); //transform key-value pairs from Set into object
       const validateFields = profileSchema.parse(rawData); //validation with Zod
       await db.profile.create({ //create new data in profile table
           data: {
               clerkId: user.id,
               email: user.emailAddresses[0].emailAddress,
               profileImage: user.imageUrl ?? '',
               firstName: validateFields.firstName,
               lastName: validateFields.lastName,
               username: validateFields.userName
           }
       })
       //ensure that user create its profile(it will update specific user(by user.id))
        await (await clerkClient()).users.updateUserMetadata(user.id, {
            privateMetadata: {
                hasProfile: true,
            }
        })
   }catch(error) {
      renderError(error);
   }
   redirect('/')
}

export const fetchImageProfile = async () => {
    const user = await currentUser();
    if(!user) return null;

    //fetch the specific user with unique id
    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id
        },
        //select the subset of fields
        select: {
            profileImage: true
        }
    })
    return profile?.profileImage;
}

export const fetchProfile = async () => {
    const user = await getAuthUser();
    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id
        }
    });
    if(!profile) redirect('/profile/create');
    return profile;
}

export const updateProfileAction = async (
    prevState: any,
    formData: FormData
): Promise<{message: string}> => {
    const user = await getAuthUser();

    try {
        const rawData = Object.fromEntries(formData); //transform key-value pairs from Set into object
        const validateFields = profileSchema.parse(rawData); //validation with Zod

        //update single record
        await db.profile.update({
            where:{
                clerkId: user.id
            },
            data: {
                ...validateFields,
            }
        });
        revalidatePath('/profile');
    }catch(error) {
        renderError(error);
    }
    return {message: 'Profile updated successfully'};
}