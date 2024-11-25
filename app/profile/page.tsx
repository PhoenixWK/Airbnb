
import React from 'react'
import FormContainer from '@/components/form/FormContainer';
import {updateProfileAction, fetchProfile, updateProfileImageAction} from '@/utils/actions';
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Button';
import ImageInputContainer from "@/components/form/ImageInputContainer";

const ProfilePage = async () => {
    const profile = await fetchProfile();

    return (
        <section className="container pt-6">
            <h1 className="text-2xl font-semibold capitalize mb-8">Update user</h1>
            <div className="border p-8 rounded-md">
                <ImageInputContainer
                    image={profile.profileImage}
                    name={profile.username}
                    action={updateProfileImageAction}
                    text="Update profile image"
                />
                <FormContainer action={updateProfileAction}>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <FormInput
                            type="text"
                            name="firstName"
                            label="First name"
                            defaultValue={profile.firstName}
                        />
                        <FormInput
                            type="text"
                            name="lastName"
                            label="Last name"
                            defaultValue={profile.lastName}
                        />
                        <FormInput
                            type="text"
                            name="userName"
                            label="Username"
                            defaultValue={profile.username}
                        />
                    </div>
                    <SubmitButton text="Update profile" className="mt-8"/>
                </FormContainer>
            </div>
        </section>
    )
}

export default ProfilePage
