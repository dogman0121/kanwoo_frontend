import { profileServerApi } from "@/lib/fetch/features/profile/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Profile from "@/types/profile/profile";
import ProfilePageDesktop from "./ProfilePageDesktop";
import ProfilePageMobile from "./ProfilePageMobile";
import { serverFetch } from "@/lib/fetch/serverFetch";

export async function generateMetadata({
    params 
}: {
    params: Promise<{profileSlug: string}>
}): Promise<Metadata> {
    const { profileSlug } = await params;

    const {data: profile} = await serverFetch.get<Profile>(`/profiles/${profileSlug}/get`)

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
    params: Promise<{profileSlug: string}>,
    searchParams: Promise<{ viewport: string }>
}) {
    const {viewport} = await searchParams

    const {profileSlug} = await params;

    const {data: profile} = await serverFetch.get<Profile>(`/profiles/${profileSlug}/get`)

    if (!profile)
        return notFound()

    return (
        <>
            {viewport == "mobile" ?
                <ProfilePageMobile profile={profile}/>
                :
                <ProfilePageDesktop profile={profile}/>
            }
        </>
    )
}