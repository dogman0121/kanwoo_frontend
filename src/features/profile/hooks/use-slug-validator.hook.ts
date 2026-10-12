"use client"

import { profileClientApi } from "@/lib/fetch/features/profile/client.api";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";

export default function useSlugValidator(defaultValue?: string) {
    const [validating, setValidating] = useState(false)
    const [isValid, setIsValid] = useState(true)

    const debouncedValidate = useMemo(
        () => debounce(async (slug: string) => {
            try {
                if (slug == defaultValue) {
                    return setIsValid(true)
                }
                
                const response = await profileClientApi.checkProfileSlug(slug)
                setIsValid(response.data.available)
            } finally {
                setValidating(false)
            }
        }, 200),
        []
    )

    useEffect(() => {
        return () => debouncedValidate.cancel()
    }, [debouncedValidate])

    const validate = (slug: string) => {
        setValidating(true)

        debouncedValidate(slug)
    }

    return {
        validating: validating,
        validate: validate,
        isValid: isValid
    }
}