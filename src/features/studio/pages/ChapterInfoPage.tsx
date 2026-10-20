import EditHeader from "@/components/edit/EditHeader";
import EditHeaderNav from "@/components/edit/EditHeaderNav";
import { Button } from "@mui/material";
import UpdateChapterInfoForm, { useUpdateChapterInfoForm } from "../forms/UpdateChapterInfoForm";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectChapter, updateChapter } from "../states/chapter/page.slice";
import EditPageContainer from "@/components/edit/EditPageContainer";

export default function ChapterInfoPage() {
    const dispatch = useAppDispatch()

    const chapter = useAppSelector(selectChapter)

    const {formState, reset, ...formProps} = useUpdateChapterInfoForm(chapter)

    if (!chapter) return

    return (
        <>
            <EditHeader>Основная информация</EditHeader>
            <EditHeaderNav
                buttons={
                    <>
                        <Button
                            variant="outlined"
                            disabled={!formState.isDirty}
                            type="reset"
                            onClick={() => reset()}
                        >
                            Отменить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={(!formState.isValid || !formState.isDirty)}
                            type="submit"
                            form="chapter-info"
                        >
                            Сохранить
                        </Button>
                    </>
                }
            />
            <EditPageContainer
                sx={{
                    py: 2
                }}
            >
                <UpdateChapterInfoForm 
                    reset={reset}
                    formState={formState}
                    onUpdate={(data) => dispatch(updateChapter({chapterId: chapter.id, form: data}))}
                    {...formProps}
                />
            </EditPageContainer>
        </>
    )
}