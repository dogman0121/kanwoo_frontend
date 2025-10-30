"use client"

import { Box, Button, IconButton, MenuItem } from "@mui/material"
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {v4 as uuid} from "uuid";
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
import EditInput from "@/features/edit/EditInput";
import EditInputLabel from "@/features/edit/EditInputLabel";
import EditInputCaption from "@/features/edit/EditInputCaption";
import EditSelect from "@/features/edit/EditSelect";


function SortableTranslation({ 
    translation, 
    index, 
    onRemove, 
    onChangeName, 
    onChangeLang 
}: {
    translation: { name: string; lang: string };
    index: number;
    onRemove: (index: number) => void;
    onChangeName: (index: number, value: string) => void;
    onChangeLang: (index: number, value: string) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useSortable({ 
        id: `translation-${index}`,  
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    };
    const [closeOpen, setCloseOpen] = useState(false);

    const [nameTouched, setNameTouched] = useState(false)
    const [linkTouched, setLinkTouched] = useState(false)

    const [nameError, setNameError] = useState(false); 
    const [langError, setLangError] = useState(false); 

    useEffect(() => {
        if (translation.name == "")
            setNameError(true)
        else
            setNameError(false)

        if (translation.lang == "")
            setLangError(true)
        else
            setLangError(false)

    }, [translation])


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
            <EditSelect 
                value={translation.lang}
                type="lang"
                onFocus={() => setLinkTouched(true)}
                onChange={(e) => {
                    onChangeLang(index, e.target.value as string)
                }}
                error={langError && linkTouched}
            >
                <MenuItem value="en">Английский</MenuItem>
            </EditSelect>
            <EditInput 
                placeholder="Название"
                value={translation.name}
                onFocus={() => setNameTouched(true)}
                onChange={(e) => {
                    onChangeName(index, e.target.value)
                }}
                error={nameError && nameTouched}
                sx={{
                    width: "500px"
                }}
            />
            <IconButton 
                sx={{
                    visibility: closeOpen ? "none" : "hidden"
                }}
                onClick={() => onRemove(index)}
            >
                <ClearRoundedIcon />
            </IconButton>
        </Box>
    );
}

export default function NameTranslations({
    value,
    onChange
}: {
    value: { name: string; lang: string; id?: string }[];
    onChange: (lists: { name: string; lang: string }[]) => void;
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
            lang: "en", 
        });

        itemsWithIds.push({
            name: "", 
            lang: "en", 
            id: `translation-${Date.now()}` 
        })
        onChange(v);
    }

    const handleRemoveTranslation = (index: number) => {
        const v = [...value];
        v.splice(index, 1);
        onChange(v);
    }

    const handleChangeName = (index: number, newName: string) => {
        const v = [...value];
        v[index] = { ...v[index], name: newName };
        onChange(v);
    }

    const handleChangeLang = (index: number, newLang: string) => {
        const v = [...value];
        v[index] = { ...v[index], lang: newLang };
        onChange(v);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
        const oldIndex = value.findIndex(item => 
            item.id === active.id || `translation-${value.findIndex(x => x === item)}` === active.id
        );
        const newIndex = value.findIndex(item => 
            item.id === over.id || `translation-${value.findIndex(x => x === item)}` === over.id
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
        id: `translation-${index}`
    }));

    return (
        <Box>
        <EditInputLabel>
            Другие названия
        </EditInputLabel>
        <EditInputCaption>
            На разных языках
        </EditInputCaption>
        
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext 
            items={itemsWithIds.map(item => item.id)} 
            strategy={verticalListSortingStrategy}
            >
            {itemsWithIds?.map((translation, index) => (
                <SortableTranslation
                key={translation.id}
                translation={translation}
                index={index}
                onRemove={handleRemoveTranslation}
                onChangeName={handleChangeName}
                onChangeLang={handleChangeLang}
                />
            ))}
            </SortableContext>
        </DndContext>

        <Button 
            variant="contained"
            onClick={handleAddLink}
            disabled={
                value?.some(
                    (translation) => translation.lang == "" || translation.name == ""
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