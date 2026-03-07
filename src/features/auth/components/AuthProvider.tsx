"use client"

import { useState } from "react";
import authSectionContext from "../context/authSectionContext";
import { AuthSection } from "../types/AuthPanel";

export default function AuthProvider({
    children, 
    defaultSection, 
}: {
    children: React.ReactNode, 
    defaultSection?: AuthSection, 
}) {
    const [section, setSection] = useState<AuthSection>(defaultSection || AuthSection.LOGIN)

    return (
        <authSectionContext.Provider value={{
                section: section, 
                setSection: setSection
            }}
        >
            {children}
        </authSectionContext.Provider>
    )
}