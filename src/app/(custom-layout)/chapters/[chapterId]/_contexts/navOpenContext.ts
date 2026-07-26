import { createContext, Dispatch, SetStateAction } from "react";

interface NavOpenContextProps {
    open: boolean,
    endOpen: boolean,
    setEndOpen: Dispatch<SetStateAction<boolean>>
    setOpen: Dispatch<SetStateAction<boolean>>
}

const NavOpenContext = createContext<NavOpenContextProps>({
    open: true, 
    setOpen: () => {},
    endOpen: false,
    setEndOpen: () => {}
})

export default NavOpenContext