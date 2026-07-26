import AdminManga from "@/types/admin/manga/manga";
import Profile from "@/types/profile/profile";
import { createContext } from "react";

const AdminProfileContext = createContext<{profile: Profile | null}>({profile: null})

export default AdminProfileContext