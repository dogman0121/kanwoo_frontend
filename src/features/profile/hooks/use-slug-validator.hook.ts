"use client"

import { profileClientApi } from "@/lib/fetch/features/profile/client.api";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

export enum SlugInvalidReason {
    MORE_THAN_MAX_LENGTH,
    CONTAINS_UNALLOWED_SYMBOLS,
    ALREADY_TAKEN
}

export default function useSlugValidator(defaultValue?: string) {
    const [validating, setValidating] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [invalidReason, setInvalidReason] = useState<SlugInvalidReason | null>(null)

    const checkSlugIsCorrect = useCallback((slug: string) => {
        const moreThanMaxLength = slug.length > 32
        const containsUnallowedSymbols = !/^[a-z0-9_]+(?![\s\S])/.test(slug)
        if (moreThanMaxLength) {
            setInvalidReason(SlugInvalidReason.MORE_THAN_MAX_LENGTH)
        }
        if (containsUnallowedSymbols) {
            setInvalidReason(SlugInvalidReason.CONTAINS_UNALLOWED_SYMBOLS)
        }

        const isCorrect = !(moreThanMaxLength || containsUnallowedSymbols)
        return isCorrect
    }, [])

    const checkSlugIsTaken = useCallback(async (slug: string) => {
        const response = await profileClientApi.checkProfileSlug(slug)
        const available = response.data.available || false
        if (!available) {
            setInvalidReason(SlugInvalidReason.ALREADY_TAKEN)
        }

        return available
    }, [])

    const debouncedValidateSlug = useMemo(
        () => debounce(async (slug: string) => {
            if (slug == defaultValue)
                return setIsValid(true)

            setValidating(true)

            try {
                let isSlugCorrect = checkSlugIsCorrect(slug)

                if (isSlugCorrect) {
                    isSlugCorrect = await checkSlugIsTaken(slug)
                }

                setIsValid(isSlugCorrect)
            } finally {
                setValidating(false)
            }
        }, 500),
        []
    )

    useEffect(() => {
        return () => debouncedValidateSlug.cancel()
    }, [debouncedValidateSlug])

    const validate = (slug: string) => {
        setValidating(true)

        debouncedValidateSlug(slug)
    }

    return {
        validating: validating,
        validate: validate,
        isValid: isValid,
        invalidReason: !isValid ? invalidReason : null
    }
}