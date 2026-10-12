import { Control, Controller } from "react-hook-form";
import { UpdateProfileInfoFormSchema } from "../../forms/UpdateProfileInfoForm";
import ProfileLinks from "../ui/profile/Links";

export default function LinksInput({
    control
}: {control: Control<UpdateProfileInfoFormSchema>}) {
    return (
        <Controller
            control={control}
            name="links"
            rules={{
                validate: (value) => {
                    for (const v of value) {
                        if (v.link == "" || v.name == "")
                            return false;
                        
                        try {
                            new URL(v.link);
                        } catch (e) {
                            return false;
                        }
                    }
                }
            }}
            render={({field: {value, onChange}}) => (
                <ProfileLinks
                    value={value}
                    onChange={onChange}
                />
            )}
        /> 
    )
}