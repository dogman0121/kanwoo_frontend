const prepareFileAction = (file: string | File | null) => {
    let action: "update" | "keep" | "delete";

    if (file instanceof File)
        action = "update"
    else if (file == null)
        action = "delete"
    else
        action = "keep"

    return action
}

export default prepareFileAction;