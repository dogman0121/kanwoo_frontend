import { clientFetch } from "@/lib/fetch/clientFetch";
import { debounce } from "lodash"
import { useRef, useState } from "react"

export default function useProfileSlugValidator() {
    const [slugValid, setSlugValid] = useState(true)

    const [slugChecking, setSlugChecking] = useState(false)

    const validateSlugRef = useRef(debounce(async (slug: string) => {
        setSlugChecking(true)

        try {
            const response = await clientFetch.get<{available: boolean}>(`/profiles/check_slug?slug=${slug}`)
            
            setSlugValid(response.data.available);
        } catch (_) {
            setSlugValid(false);
        }
        finally {
            setSlugChecking(false)
        }
    }, 200)) 
    
    return { valid: slugValid, checking: slugChecking, validateSlug: validateSlugRef.current}
}