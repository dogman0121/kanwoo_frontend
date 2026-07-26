"use client"

import { usePathname } from "next/navigation";

export default function useResources() {
    const pathName = usePathname()

    const [...resources] = pathName.split("/")

    return { resources: resources }
}