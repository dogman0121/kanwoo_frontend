"use client"

import EditInput from "@/components/edit/EditInput";

export default function MangaYear({value}: {value: number}) {
    return (
        <EditInput
            label={"Год выпуска"}
            inputProps={{
                type: "number",
                value: value
            }}
        />
    )
}