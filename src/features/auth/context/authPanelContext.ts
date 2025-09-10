import { createContext } from "react";
import { AuthPanel } from "../types/AuthPanel";

interface AuthPanelContextProps {
    panel: AuthPanel,
    setPanel: React.Dispatch<React.SetStateAction<AuthPanel>>
}

const authPanelContext = createContext<AuthPanelContextProps>({panel: AuthPanel.LOGIN, setPanel: () => {}});

export default authPanelContext;