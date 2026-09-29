"use client"

import React from "react"

export interface PostInput {
    size: "small" | "medium",
    onSend: (
        text: string, 
        mode: "now" | "deferred",
        publication_datetime?: Date
    ) => void
}

export function SendButton({
    size,
    onClick
}: {
    size: "small" | "medium",
    onClick?: () => void
}) {
    return (
        <></>
    )
}

export function InputContainer({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <></>
    )
} 

export default function PostInput() {
    return (
        <></>
    )
}