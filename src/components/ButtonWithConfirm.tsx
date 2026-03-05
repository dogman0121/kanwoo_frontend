"use client"

import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { MouseEvent, useRef, useState } from "react";

export default function ButtonWithConfirm({onClick, ...props}: ButtonProps) {
    const clickEvent = useRef<MouseEvent<HTMLButtonElement>>(null);

    const [dialogOpen, setDialogOpen] = useState(false)
    
    return (
        <>
            <Button
                {...props}
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    clickEvent.current = event;
                    setDialogOpen(true)
                }}
            />
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
                            
                            clickEvent.current ? onClick?.(clickEvent.current) : null
                        }}
                    >
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}