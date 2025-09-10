"use client"

import { useState } from "react"
import authPanelContext from "../context/authPanelContext"
import { AuthPanel } from "../types/AuthPanel"

export default function AuthPanelProvider({children}: {children: React.ReactNode}) {
    const [currentPanel, setCurrentPanel] = useState(AuthPanel.LOGIN);

    return (
        <authPanelContext.Provider value={{panel: currentPanel, setPanel: setCurrentPanel}}>
            {children}
        </authPanelContext.Provider>
    )
}