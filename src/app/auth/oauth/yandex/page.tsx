import YandexHelpPageScript from "@/lib/yandex-oauth/YandexHelpPageScript";
import Head from "next/head";
import Script from "next/script";

export default async function Page() {
    return (
        <>
            <Head>
                <Script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js" />
            </Head>
            <YandexHelpPageScript />
        </>
    )
}