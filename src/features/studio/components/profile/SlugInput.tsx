import { Control, Controller } from "react-hook-form";
import { throttle } from "lodash";
import useSlugValidator from "@/features/profile/hooks/use-slug-validator.hook";
import { UpdateProfileInfoFormSchema } from "../../forms/UpdateProfileInfoForm";
import ProfileSlug from "../ui/profile/ProfileSlug";

export default function SlugInput({
    defaultValue,
    control
}: {
    defaultValue?: string,
    control: Control<UpdateProfileInfoFormSchema>
}) {
    const {validating, isValid, validate} = useSlugValidator(defaultValue)

    return (
        <Controller
            control={control}
            name="slug"
            rules={{
                required: "Это поле не должно быть пустым",
                validate: throttle(async (value) => {
                    validate(value)

                    return true
                }, 500)
            }}
            render={({field: {value, ...props}, fieldState: {error}}) => (
                <ProfileSlug
                    defaultValue={defaultValue}
                    slugChecking={validating}
                    error={!isValid}
                    helperText={!isValid ? "Данный тег занят" : error?.message}
                    value={value}
                    {...props}
                />
            )}
        />
    )
}