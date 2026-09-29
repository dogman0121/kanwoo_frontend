export default function encodeCursor(cursor: Record<string, unknown>) {
    const cursorJson = JSON.stringify(cursor)
    const cursorBytes = new TextEncoder().encode(cursorJson)
    const binary = String.fromCharCode(...cursorBytes)
    const cursorString = btoa(binary)
    return cursorString
}