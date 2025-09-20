"use client"

import { AuthPanel } from "../types/AuthPanel";
import authPanelContext from "../context/authPanelContext";
import { Dispatch, SetStateAction } from "react";

export default function AuthPanelProvider({
    children, 
    panel, 
    setPanel
}: {
    children: React.ReactNode, 
    panel: AuthPanel, 
    setPanel: Dispatch<SetStateAction<AuthPanel>>
}) {
    return (
        <authPanelContext.Provider value={{panel: panel, setPanel: setPanel}}>
            {children}
        </authPanelContext.Provider>
    )
}