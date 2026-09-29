import { TextField, TextFieldProps } from "@mui/material";
import { isNumber } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";

export default function TotpInput({onChange, ...props}: {onChange: (code?: number) => void} & Omit<TextFieldProps, "onChange">) {
    const [code, setCode] = useState("")

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        if (val == "") {
            setCode(val)
            onChange(undefined)
        }

        if (!isNaN(parseInt(val[val.length-1]))){
            if (val.length > 6)
                return
            else if (val.length == 6) {
                const code = parseInt(val)

                if (isNaN(code))
                    throw new Error("Faled to parse code")
            }
            
            onChange(parseInt(val))
            setCode(val)
        }


    }

    return (
        <TextField 
            value={code}
            onChange={handleChange}
            placeholder="••••••"
            sx={{
                "input": {
                    p: "10px 15px",
                    textAlign: "center",
                    fontSize: "28px",
                    fontWeight: "600",

                    "::placeholder": {
                        letterSpacing: "2px"
                    }
                }
            }}
            {...props}
        />
    )
}