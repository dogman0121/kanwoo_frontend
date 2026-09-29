import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { cloneElement, ReactElement, useState } from "react"

export default function Confirmation({
    children,
    onConfirm
}: {
    children: ReactElement<{onClick: (event: PointerEvent) => void}>,
    onConfirm: () => void
}) {

    const [dialogOpen, setDialogOpen] = useState(false)

    const handleClick = () => {
        setDialogOpen(true)
    }

    return (
        <>
            {cloneElement(children, {onClick: handleClick})}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <DialogTitle>
                    Подтверждение
                </DialogTitle>
                <DialogContent>
                    Вы уверены сделать это?
                </DialogContent>
                <DialogActions>
                    <Button 
                        variant="outlined"
                        onClick={() => setDialogOpen(false)}
                    >
                        Нет
                    </Button>
                    <Button 
                        variant="contained"
                        onClick={() => {
                            setDialogOpen(false);
                            
                            onConfirm()
                        }}
                    >
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}