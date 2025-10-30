import EditPageHeader from "@/features/edit/EditPageHeader";
import InfoForm from "./_components/InfoForm";

export default async function Page() {
    return (
        <>
            <EditPageHeader>
                Основная информация
            </EditPageHeader>
            <InfoForm />
        </>
    )
}