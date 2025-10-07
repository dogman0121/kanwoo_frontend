"use client"

import { Box, Button, IconButton } from "@mui/material"
import { TextInput, TextInputCaption, TextInputLabel } from "./InfoForm"
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useRef, useState } from "react";


function SortableLink({ 
    link, 
    index, 
    onRemove, 
    onChangeName, 
    onChangeLink 
}: {
    link: { name: string; link: string };
    index: number;
    onRemove: (index: number) => void;
    onChangeName: (index: number, value: string) => void;
    onChangeLink: (index: number, value: string) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useSortable({ 
        id: `link-${index}`,  
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    };
    const [closeOpen, setCloseOpen] = useState(false);

    const [nameTouched, setNameTouched] = useState(false)
    const [linkTouched, setLinkTouched] = useState(false)

    const [nameError, setNameError] = useState(false); 
    const [linkError, setLinkError] = useState(false); 

    useEffect(() => {
        if (link.name == "")
            setNameError(true)
        else
            setNameError(false)

        if (link.link == "")
            setLinkError(true)
        else
            setLinkError(false)

        try {
            new URL(link.link)

            setLinkError(false)
        } catch (e) {
            setLinkError(true)
        }
    }, [link])


    return (
        <Box
            ref={setNodeRef}
            style={style}
            onMouseOver={() => setCloseOpen(true)}
            onMouseOut = {() => setCloseOpen(false)}
            sx={{
                mt: "10px",
                display: "flex",
                flexDirection: "row",
                columnGap: "10px",
                alignItems: "center",
            }}
        >
            <Box {...attributes} {...listeners}>
                <DragIndicatorRoundedIcon 
                sx={{
                    cursor: isDragging ? "grabbing" : "grab",
                }}
                />
            </Box>
            <TextInput 
                placeholder="Название ссылки"
                value={link.name}
                onFocus={() => setNameTouched(true)}
                onChange={(e) => {
                    onChangeName(index, e.target.value)
                }}
                error={nameError && nameTouched}
            />
            <TextInput 
                placeholder="Ссылка (URL)"
                value={link.link}
                type="url"
                onFocus={() => setLinkTouched(true)}
                onChange={(e) => {
                    
                    onChangeLink(index, e.target.value)
                }}
                error={linkError && linkTouched}
                sx={{
                    width: "500px"
                }}
            />
            { closeOpen && (
                <IconButton 
                    onClick={() => onRemove(index)}
                >
                    <ClearRoundedIcon />
                </IconButton>
            )}
        </Box>
    );
}

export default function Links({
    value,
    onChange
}: {
    value: { name: string; link: string; id?: string }[];
    onChange: (lists: { name: string; link: string }[]) => void;
}) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddLink = () => {
        const v = [...value];

        v.push({ 
            name: "", 
            link: "", 
        });

        itemsWithIds.push({
            name: "", 
            link: "", 
            id: `link-${Date.now()}` 
        })
        onChange(v);
    }

    const handleRemoveLink = (index: number) => {
        const v = [...value];
        v.splice(index, 1);
        onChange(v);
    }

    const handleChangeName = (index: number, newName: string) => {
        const v = [...value];
        v[index] = { ...v[index], name: newName };
        onChange(v);
    }

    const handleChangeLink = (index: number, newLink: string) => {
        const v = [...value];
        v[index] = { ...v[index], link: newLink };
        onChange(v);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
        const oldIndex = value.findIndex(item => 
            item.id === active.id || `link-${value.findIndex(x => x === item)}` === active.id
        );
        const newIndex = value.findIndex(item => 
            item.id === over.id || `link-${value.findIndex(x => x === item)}` === over.id
        );

        if (oldIndex !== -1 && newIndex !== -1) {
            const newItems = arrayMove(value, oldIndex, newIndex);
            onChange(newItems);
        }
        }
    }

    // Ensure each item has an ID for dnd-kit
    const itemsWithIds = value.map((item, index) => ({
        ...item,
        id: `link-${index}`
    }));

    return (
        <Box>
        <TextInputLabel>
            Ссылки
        </TextInputLabel>
        <TextInputCaption>
            Ссылками могут быть соцсети или иные ресурсы. Будут видны в описании канала.
        </TextInputCaption>
        
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext 
            items={itemsWithIds.map(item => item.id)} 
            strategy={verticalListSortingStrategy}
            >
            {itemsWithIds?.map((link, index) => (
                <SortableLink
                key={link.id}
                link={link}
                index={index}
                onRemove={handleRemoveLink}
                onChangeName={handleChangeName}
                onChangeLink={handleChangeLink}
                />
            ))}
            </SortableContext>
        </DndContext>

        <Button 
            variant="contained"
            onClick={handleAddLink}
            disabled={
                value?.some(
                    (link) => link.link == "" || link.name == ""
                )
            }
            sx={{
                display: "flex",
                mt: "10px"
            }}
            startIcon={
                <AddRoundedIcon />
            }
        >
            Добавить
        </Button>
        </Box>
    );
}