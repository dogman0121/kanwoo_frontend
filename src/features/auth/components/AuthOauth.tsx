import { Box } from "@mui/material";
import { YANDEX_OAUTH_CONTAINER_ID } from "./Auth";
import YandexOauthScript from "@/lib/yandex-oauth/YandexOauthScript";

export default function AuthOauth() {
    return (
        <>
            <Box id={YANDEX_OAUTH_CONTAINER_ID}/>
            <YandexOauthScript />
        </>
    )
}