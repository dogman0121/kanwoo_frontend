"use client"

import { createContext } from "react";
import { AuthSection } from "../types/AuthPanel";

interface AuthSectionContextProps {
    section: AuthSection,
    setSection: React.Dispatch<React.SetStateAction<AuthSection>>
}

const authSectionContext = createContext<AuthSectionContextProps>({
    section: AuthSection.LOGIN, 
    setSection: () => {}
});

export default authSectionContext;