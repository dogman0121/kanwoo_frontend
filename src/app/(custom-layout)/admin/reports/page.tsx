"use client"

import { AppTab, AppTabContext, AppTabList, AppTabPanel } from "@/components/AppTabs";
import { EditPageHeader, EditPageNavbar, EditPageTitle } from "@/features/edit/components/EditHeader";
import EditPageContainer from "@/features/edit/components/EditPageContainer";
import { useEffect, useState } from "react";
import ResolveFiltersGroup, { ResolveFilterType } from "../_components/ResolveFiltersGroup";
import { clientFetch } from "@/lib/fetch/clientFetch";
import AdminMangaReport from "@/types/admin/reports/mangaReport";
import { resolveService } from "../_services/resolveService";
import AdminChapterReport from "@/types/admin/reports/chapterReport";
import LoadingBox from "../_features/LoadingBox";
import EmptyTitle from "../_features/EmptyTitle";
import { AdminAccordion, AdminAccordionDetails, AdminAccordionSummary } from "../_features/accordion/Accordion";
import { useTheme } from "@mui/material";

export default function Page() {
    const theme = useTheme()

    const [tab, setTab] = useState("1")

    const [mangaIsLoading, setMangaIsLoading] = useState(false)
    const [chapterIsLoading, setChapterIsLoading] = useState(false)

    const [mangaReports, setMangaReports] = useState<AdminMangaReport[]>([])
    const [chaptersReports, setChaptersReports] = useState<AdminChapterReport[]>([])

    const [mangaReportFilters, setMangaReportFilters] = useState<ResolveFilterType>({unresolved: false, resolved: false})
    const [chaptersReportFilters, setChaptersReportFilters] = useState<ResolveFilterType>({unresolved: false, resolved: false})
   
    useEffect(() => {
        setMangaIsLoading(true)

        const urlParams = resolveService.compileParams(mangaReportFilters)

        clientFetch.get<AdminMangaReport[]>("/admin/reports/getMangaReports?" + urlParams)
            .then(resp => {
                setMangaReports(resp.data)
            })
            .finally(() => {
                setMangaIsLoading(false)
            })
    }, [mangaReportFilters])

    useEffect(() => {
        setChapterIsLoading(true)

        const urlParams = resolveService.compileParams(chaptersReportFilters)

        clientFetch.get<AdminChapterReport[]>("/admin/reports/getChaptersReports?" + urlParams)
            .then(resp => {
                setChaptersReports(resp.data)
            })
            .finally(() => {
                setChapterIsLoading(false)
            })
    }, [chaptersReportFilters])

    return (
        <AppTabContext
            value={tab}
        >
            <EditPageHeader>
                <EditPageTitle>Жалобы</EditPageTitle>
                <EditPageNavbar
                    sx={{
                        paddingBottom: "0",
                        justifyContent: "start"
                    }}
                >
                    <AppTabList onChange={(_event, val) => setTab(val)}>
                        <AppTab value="1" label="Манга"/>
                        <AppTab value="2" label="Главы" />
                    </AppTabList>
                </EditPageNavbar>
            </EditPageHeader>
            <EditPageContainer>
                <AppTabPanel value={"1"}>
                    <ResolveFiltersGroup 
                        value={mangaReportFilters}
                        onChange={(v) => setMangaReportFilters(v)}
                    />
                    <LoadingBox 
                        loading={mangaIsLoading}
                        sx={{
                            mt: theme.spacing(3),
                            display: "flex",
                            flexDirection: "column",
                            gap: theme.spacing(3)
                        }}    
                    >
                        {mangaReports.length == 0 ?
                            <EmptyTitle />
                            :
                            <>
                                {mangaReports.map(mr => (
                                    <AdminAccordion
                                        key={`manga_report_${mr.id}`}
                                    >
                                        <AdminAccordionSummary></AdminAccordionSummary>
                                        <AdminAccordionDetails></AdminAccordionDetails>
                                        <AdminAccordionSummary></AdminAccordionSummary>
                                    </AdminAccordion>
                                ))}
                            </>
                        }
                    </LoadingBox>
                </AppTabPanel>
                <AppTabPanel value={"2"}>
                    <ResolveFiltersGroup 
                        value={chaptersReportFilters}
                        onChange={(v) => setChaptersReportFilters(v)}
                    />
                    <LoadingBox 
                        loading={chapterIsLoading}
                        sx={{
                            mt: theme.spacing(3),
                            display: "flex",
                            flexDirection: "column",
                            gap: theme.spacing(3)
                        }}    
                    >
                        {chaptersReports.length == 0 ?
                            <EmptyTitle />
                            :
                            <>
                                {chaptersReports.map(cr => (
                                    <AdminAccordion
                                        key={`chapter_report_${cr.id}`}
                                    >
                                        <AdminAccordionSummary></AdminAccordionSummary>
                                        <AdminAccordionDetails></AdminAccordionDetails>
                                        <AdminAccordionSummary></AdminAccordionSummary>
                                    </AdminAccordion>
                                ))}
                            </>
                        }
                    </LoadingBox>
                </AppTabPanel>
            </EditPageContainer>
        </AppTabContext>
    )
}