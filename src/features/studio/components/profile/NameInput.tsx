import { Control, Controller } from "react-hook-form";
import { UpdateProfileInfoFormSchema } from "../../forms/UpdateProfileInfoForm";
import ProfileName from "../ui/profile/Name";

export default function NameInput({
    control
}: {control: Control<UpdateProfileInfoFormSchema>}) {
    return (
        <Controller
            control={control}
            name="name"
            rules={{
                required: "Это поле не должно быть пустым",
            }}
            render={({field, fieldState: {invalid, error}}) => (
                <ProfileName
                    error={invalid}
                    helperText={error?.message}
                    sx={{
                        mt: "10px"
                    }}
                    {...field}
                />
            )}
        />
    )
}