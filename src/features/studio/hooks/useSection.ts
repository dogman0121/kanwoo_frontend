"use client"

import { usePathname } from "next/navigation";

export default function useSection() {
    const pathName = usePathname()

    const [...resources] = pathName.split("/")

    return {section: resources?.[4] || "main" }
}