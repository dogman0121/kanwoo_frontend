import { Box } from "@mui/material";
import { YANDEX_OAUTH_CONTAINER_ID } from "./Auth";
import YandexOauthScript, { YandexOauthResponse } from "@/lib/yandex-oauth/YandexOauthScript";


export default function AuthOauth({
    onYandexAuth
}: {
    onYandexAuth: (data: YandexOauthResponse) => void
}) {
    return (
        <>
            <Box id={YANDEX_OAUTH_CONTAINER_ID}/>
            <YandexOauthScript onAuth={(data) => onYandexAuth(data)}/>
        </>
    )
}