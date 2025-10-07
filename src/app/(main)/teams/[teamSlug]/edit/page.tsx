import { teamServerApi } from "@/lib/api/features/team/server";
import Team from "@/types/team";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params 
}: {
    params: Promise<{teamSlug: string}>
}): Promise<Metadata> {
    const { teamSlug } = await params;

    const team: Team = await teamServerApi.getTeam(teamSlug)

    if (!team)
        return notFound();

    return {
        title: `Команда ${team.name} | kanwoo`,
        description: team.about,
        openGraph: {
            type: "profile",
            url: `https://kanwoo.ru/teams/${team.slug}`,
            title: `Команда ${team.name} | kanwoo`,
            description: team.about,
            images: [{url: team.avatar}],
            siteName: "Kanwoo"
        }
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{teamSlug: string}>,
}) {
    const {teamSlug} = await params;

    const team = await teamServerApi.getTeam(teamSlug)

    if (!team)
        return notFound();

    return (
        <>
            dfgdfgdgdf
        </>
    )
}