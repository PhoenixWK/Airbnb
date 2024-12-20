
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import {SubmitButton} from "@/components/form/Button";
import {createProfileAction} from "@/utils/actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

export default async function CreateProfilePage() {
    //Check if user has its profile, then redirect user to homepage
    const user = await currentUser();
    if(user?.privateMetadata?.hasProfile) return redirect('/');

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