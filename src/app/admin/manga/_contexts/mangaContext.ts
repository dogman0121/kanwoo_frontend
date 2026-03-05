import AdminManga from "@/types/admin/manga/manga";
import { createContext } from "react";

const AdminMangaContext = createContext<{manga: AdminManga | null}>({manga: null})

export default AdminMangaContext