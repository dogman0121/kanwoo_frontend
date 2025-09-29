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

    try {
        const team: Team = await teamServerApi.getTeam(teamSlug)

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
    catch (e) {
        console.log(e)
        return notFound();
    }
}


export default async function Page() {
    return <>gghdfghdfhfg</>
}