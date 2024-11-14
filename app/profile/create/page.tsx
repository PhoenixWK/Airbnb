
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import {SubmitButton} from "@/components/form/Button";

const createProfileAction = async (
    prevState: any,
    formData: FormData
) => {
    'use server'
    const firstName = formData.get('firstName') as string;
    console.log(firstName);
    return {
        message: 'Profile created successfully',
    }
}

export default function CreateProfilePage() {
    return (
        <section className="container pt-6">
            <h1 className="text-2xl font-semibold capitalize mb-8">New user</h1>
            <div className="border p-8 rounded-md">
                <FormContainer action={createProfileAction}>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <FormInput type="text" name="firstName" label="First name"  />
                        <FormInput type="text" name="lastName" label="Last name"  />
                        <FormInput type="text" name="userName" label="Username"  />
                    </div>
                    <SubmitButton text="Create profile" clasName="mt-8" />
                </FormContainer>
            </div>
        </section>
    )
}