import YandexHelpPageScript from "@/lib/yandex-oauth/YandexHelpPageScript";
import Head from "next/head";
import Script from "next/script";

export default async function Page() {
    return (
        <>
            <Script 
                src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js"
                strategy="beforeInteractive"
            />
            <YandexHelpPageScript />
        </>
    )
}