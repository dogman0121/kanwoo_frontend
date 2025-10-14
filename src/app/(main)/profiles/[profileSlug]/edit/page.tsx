import { profileServerApi } from "@/lib/api/features/profile/server";
import Profile from "@/types/profile";
import Team from "@/types/profile";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params 
}: {
    params: Promise<{profileSlug: string}>
}): Promise<Metadata> {
    const { profileSlug } = await params;

    const profile: Profile = await profileServerApi.getProfile(profileSlug)

    if (!profile)
        return notFound();

    return {
        title: `Команда ${profile.name} | kanwoo`,
        description: profile.about,
        openGraph: {
            type: "profile",
            url: `https://kanwoo.ru/teams/${profile.slug}`,
            title: `Команда ${profile.name} | kanwoo`,
            description: profile.about,
            images: [{url: profile.avatar}],
            siteName: "Kanwoo"
        }
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{profileSlug: string}>,
}) {
    const {profileSlug} = await params;

    const profile = await profileServerApi.getProfile(profileSlug)

    if (!profile)
        return notFound();

    return (
        <>
            dfgdfgdgdf
        </>
    )
}