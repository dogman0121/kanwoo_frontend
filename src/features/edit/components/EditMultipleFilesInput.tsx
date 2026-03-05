"use client"

import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import {CSS} from '@dnd-kit/utilities';
import { Box, SxProps, Typography } from "@mui/material";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded"
import { useDropzone } from "react-dropzone";
import { v4 } from "uuid";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import DragIndicatiorRoundedIcon from "@mui/icons-material/DragIndicatorRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

export interface EditFile {
    uuid: string,
    previewLink: string,
    file?: File,
    name?: string
}

function EditFileInput({
    onChange
}: {
    onChange: (value: EditFile[]) => void
}) {
    const handleDrop = (acceptedFiles: File[]) => {

        onChange(acceptedFiles.map((f: File) => ({
            uuid: v4(),
            previewLink: URL.createObjectURL(f),
            file: f,
            name: f.name
        } as EditFile)))
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: handleDrop,
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            // "application/zip": [".zip"],
            // "application/x-zip-compressed": [".zip"]
        }
    })

    return (
        <>

            <Box
                {...getRootProps()}
                sx={{
                    backgroundColor: "background.paper",
                    aspectRatio: "2/3",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: "5px 10px"
                }}
            >
                <UploadFileRoundedIcon 
                    sx={{
                        width: "42px",
                        height: "42px"
                    }}
                />
                <Typography
                    sx={{
                        mt: "10px",
                        textAlign: "center"
                    }}
                >
                    Нажмите или перенести файлы (.jpg, .png)
                </Typography>
            </Box>
            <input {...getInputProps()} type="file" />
        </>
    )
}

function EditFilePreview({
    file,
    onClose
}: {
    file: EditFile,
    onClose: () => void
}) {
    const {
        attributes, 
        listeners, 
        setNodeRef, 
        transform, 
        transition, 
        isDragging
    } = useSortable({ 
        id: file.uuid
    });

    return (
        <Box
            ref={setNodeRef} 
            {...attributes}
            sx={{
                transform: CSS.Translate.toString(transform),
                aspectRatio: "2/3",
                zIndex: isDragging ? 10003: 1,
                position: "relative",
                transition: transition
            }}
        >
            <Box 
                sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    backgroundImage: `url(${file.previewLink})`
                }}
            />   
            <Box
                sx={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "5px"
                }}
            >
                <DragIndicatiorRoundedIcon
                    {...listeners}  
                    sx={{
                        p: "2px",
                        backgroundColor: "background.paper",
                        borderRadius: "50%",
                        cursor: isDragging ? "grabbing" : "grab"
                    }}
                />
                <CloseRoundedIcon 
                    sx={{
                        p: "2px",
                        backgroundColor: "background.paper",
                        borderRadius: "50%",
                        cursor: "pointer"
                    }}
                    onClick={onClose}
                />
            </Box>
            <Typography>{file.name}</Typography>
        </Box>
    )
}

export default function EditMultipleFilesInput({
    value,
    onChange,
    sx
}: {
    value: EditFile[],
    onChange: (value: EditFile[]) => void,
    sx: SxProps
}) {
    const [ items, setItems ] = useState<string[]>([]);

    useEffect(() => {
        setItems(value.map(f => f.uuid))
    }, [value])
    
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const onInputFile = (files: EditFile[]) => {
        const newVal = [...value, ...files]

        onChange(newVal)
    }

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;
        
        if (active.id !== over?.id) {
            const oldIndex = items.indexOf(active.id as string);
            const newIndex = items.indexOf(over?.id as string);

            if (oldIndex !== -1 && newIndex !== -1) {
                onChange(arrayMove(value, oldIndex, newIndex));
            }
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <Box
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "12px",
                    p: "10px 14px",

                    display: "grid",
                    columnGap: "10px",
                    rowGap: "15px",
                    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",

                    ...sx
                }}
            >
                <SortableContext 
                    items={items}
                >
                    {value.map((v) => (
                        <EditFilePreview 
                            key={v.uuid} 
                            file={v}
                            onClose={() => {
                                URL.revokeObjectURL(v.previewLink)
                                onChange(value.filter((f) => (f.uuid != v.uuid)))
                            }}
                        />
                    ))}
                </SortableContext>
                <EditFileInput 
                    onChange={onInputFile}
                />
            </Box>
        </DndContext>
    )
}