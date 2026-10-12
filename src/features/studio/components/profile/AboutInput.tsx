import { Control, Controller } from "react-hook-form";
import { UpdateProfileInfoFormSchema } from "../../forms/UpdateProfileInfoForm";
import ProfileAbout from "../ui/profile/About";

export default function AboutInput({
    control
}: {control: Control<UpdateProfileInfoFormSchema>}) {
    return (
        <Controller
            control={control}
            name="about"
            render={({field: {value, ...props}}) => (
                <ProfileAbout 
                    value={value}
                    {...props}
                />
            )}
        />
    )
}

// export default function AboutInput({
//     control
// }: {control: Control}) {
//     return (
        
//     )
// }