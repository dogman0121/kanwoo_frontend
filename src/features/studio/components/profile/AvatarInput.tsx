import { Control, Controller } from "react-hook-form";
import { UpdateProfileInfoFormSchema } from "../../forms/UpdateProfileInfoForm";
import ProfileAvatar from "../ui/profile/Avatar";

export default function AvatarInput({
    control
}: {control: Control<UpdateProfileInfoFormSchema>}) {
    return (
        <Controller
            control={control}
            name="avatar"
            render={({field: {value, onChange}}) => (
                <ProfileAvatar
                    value={value}
                    onChange={onChange}
                />
            )}
        />
    )
}