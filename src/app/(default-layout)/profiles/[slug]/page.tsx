import { Metadata } from "next";
import { notFound } from "next/navigation";
import { profileServerApi } from "@/lib/fetch/features/profile/server.api";
import Adapter from "./Adapter";

export async function generateMetadata({
    params 
}: {
    params: Promise<{slug: string}>
}): Promise<Metadata> {
    const { slug } = await params;

    const {data: profile} = await profileServerApi.getProfile(slug)

    if (!profile)
        return notFound();

    return {
        title: `${profile.name} | kanwoo`,
        description: profile.about,
        openGraph: {
            type: "profile",
            url: `https://kanwoo.ru/teams/${profile.slug}`,
            title: `${profile.name} | kanwoo`,
            description: profile.about,
            images: [{url: profile.avatar}],
            siteName: "Kanwoo"
        }
    }
}


export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{slug: string}>,
    searchParams: Promise<{ viewport: string }>
}) {
    const { viewport } = await searchParams

    const { slug } = await params;

    const {data: { profile }, context: {profile: profileContext}} = await profileServerApi.getProfilePage(slug)

    if (!profile)
        return notFound()

    return (
        <Adapter 
            deviceType={viewport == "desktop" ? "desktop" : "mobile"}
            profile={profile}
            profileContext={profileContext}
        />
    )
}