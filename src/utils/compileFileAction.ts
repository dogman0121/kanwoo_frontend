export default function compileFileAction(file: null | File | string) {
    if (file instanceof File)
        return "update"
    else if (file == null)
        return "delete"
    else
        return "keep"
}